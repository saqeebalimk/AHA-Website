import re
import difflib
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from chatbot_api.models import ChatSession, Message, ServiceRequest, DiagnosticLog, KnowledgeBaseArticle, KnownVisualIssue
from chatbot_api.knowledge_base import get_heuristic_reply, DEFAULT_FALLBACK_MESSAGE

# ─────────────────────────────────────────────────────────────────────────────
# Token-Optimised System Prompt (approx 220 tokens)
# ─────────────────────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are the 'AHA Tech Advisor', an elite AI audio engineer for AHA Technologies, an engineering lab in Bangalore.
Your goal is to provide fluid, ChatGPT-like conversational flows while diagnosing AV equipment faults.

CORE RULES:
1. When a user reports a broken device or requests troubleshooting, ALWAYS ask for the Brand & Model first (e.g., "Please tell me the brand and model of the device.").
2. Once the user provides the Brand & Model, you MUST ask exactly: "Could you briefly describe the issue you're facing?"
3. Once the user describes the issue naturally, reply warmly and ask a relevant follow-up diagnostic question. 
   - Start your response with phrases like "Thank you for the details." or "Thank you."
   - Example follow ups: "Have you noticed any error messages, unusual sounds, burning smell, or recent changes to the wiring or settings?" or "Have you checked whether it is powered on?"
4. IF THEY ASK TO BOOK A REPAIR, collect their details sequentially (Name -> Phone -> Email -> Device -> Issue) and then summarize and provide the WhatsApp link: [ACTION:WA_BUTTON:https://wa.me/919964689378]
5. NEVER give exact price quotes. Quote: "Pricing depends strictly on the exact model and bench diagnostic results."
6. Core Services: L4 PCB Repair, Amp/AVR Repair, Home Theatres, Dolby Atmos Calibration, SMPS Repair.
7. Keep responses highly technical but warm, professional, and natural. NEVER repeat yourself.
8. Use [QUICK:Option 1|Option 2] ONLY at the very end of a message if providing distinct paths.
"""

GEMINI_URL        = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
GEMINI_VISUAL_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

# ─────────────────────────────────────────────────────────────────────────────
# Layer 2: Fast Fuzzy NLP Search over Django DB
# ─────────────────────────────────────────────────────────────────────────────
def fuzzy_search_kb(query):
    """
    Searches the KnowledgeBaseArticle table natively. 
    Returns the answer if confidence > 0.75. Target: 0 API Cost.
    """
    query_lower = query.lower()
    articles = KnowledgeBaseArticle.objects.all()
    
    best_match_answer = None
    highest_score = 0.0
    
    for article in articles:
        # Create a corpus out of the question and synonyms
        corpus = [article.question_text.lower()]
        if article.keywords:
            corpus.extend([k.strip().lower() for k in article.keywords.split(',') if k.strip()])
            
        for text in corpus:
            score = difflib.SequenceMatcher(None, query_lower, text).ratio()
            
            # Advanced Substring & Word Intersection Boost
            if len(text) > 3:
                # 1. Exact string presence
                if text in query_lower:
                    score += 0.4
                else:
                    # 2. Split word intersection (if all keyword parts are individually present in query)
                    text_words = set(text.split())
                    query_words = set(query_lower.split())
                    if text_words and text_words.issubset(query_words):
                        score += 0.35
                
            if score > highest_score:
                highest_score = score
                best_match_answer = article.answer_text
                
    if highest_score >= 0.70:
        return best_match_answer
    return None

# ─────────────────────────────────────────────────────────────────────────────
# Helper: Extract WA data
# ─────────────────────────────────────────────────────────────────────────────
def _extract_service_request_from_history(session):
    messages = list(session.messages.order_by('created_at'))
    data = {'name': '', 'phone': '', 'email': '', 'brand': '', 'model': '', 'issue': ''}
    full_text = " ".join(m.text for m in messages)
    
    name_match = re.search(r'(?:name|called|is)\s*[:\-]?\s*([A-Z][a-z]+(?: [A-Z][a-z]+)+)', full_text)
    phone_match = re.search(r'(\+?\d[\d\s\-]{8,14}\d)', full_text)
    email_match = re.search(r'([\w\.\+\-]+@[\w\-]+\.[\w\.]+)', full_text)
    
    if name_match: data['name'] = name_match.group(1)
    if phone_match: data['phone'] = phone_match.group(1)
    if email_match: data['email'] = email_match.group(1)
    return data

# ─────────────────────────────────────────────────────────────────────────────

class ChatView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id', '').strip()
        user_text = request.data.get('text', '').strip()

        if not session_id or not user_text:
            return Response({"error": "session_id and text are required"}, status=400)

        session, _ = ChatSession.objects.get_or_create(session_id=session_id)
        Message.objects.create(session=session, role='user', text=user_text)

        history_qs = session.messages.order_by('-created_at')[:16]
        contents = []
        for msg in reversed(list(history_qs)):
            contents.append({
                "role": msg.role,
                "parts": [{"text": msg.text}]
            })

        payload = {
            "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
            "contents": contents,
            "generationConfig": {"temperature": 0.05, "maxOutputTokens": 400}
        }

        # ───────────────────────────────────────────────────────────────
        # PRIMARY ENGINE: LOCAL NLP & HEURISTICS
        # ───────────────────────────────────────────────────────────────
        reply_text = None
        generated_by = 'user'

        # Layer 1: State Machine + Heuristics (handles active flows + regex intents)
        hr_reply = get_heuristic_reply(session, user_text)
        if hr_reply != DEFAULT_FALLBACK_MESSAGE:
            reply_text = hr_reply
            generated_by = 'layer1_heuristic'
        
        # Layer 2: Knowledge Base Fuzzy Search (only if no active intent in Layer 1)
        if not reply_text and not session.current_intent:
            kb_reply = fuzzy_search_kb(user_text)
            if kb_reply:
                reply_text = kb_reply
                generated_by = 'layer2_kb'

        # LAYER 3: FALLBACK ENGINE: GEMINI AI
        if not reply_text:
            if not settings.GEMINI_API_KEY:
                reply_text = "❌ **System Error:** The `GEMINI_API_KEY` environment variable is not exported in the server terminal."
                generated_by = 'layer1_heuristic'
            else:
                try:
                    resp = requests.post(
                        f"{GEMINI_URL}?key={settings.GEMINI_API_KEY}",
                        json=payload,
                        timeout=20
                    )
                    data = resp.json()

                    if resp.status_code == 200 and "error" not in data:
                        reply_text = data["candidates"][0]["content"]["parts"][0]["text"]
                        generated_by = 'layer3_gemini'
                    else:
                        reply_text = DEFAULT_FALLBACK_MESSAGE
                        generated_by = 'layer1_heuristic'
                except (requests.Timeout, requests.ConnectionError, Exception):
                    reply_text = DEFAULT_FALLBACK_MESSAGE
                    generated_by = 'layer1_heuristic'

        # ───────────────────────────────────────────────────────────────
        # UNIFIED DATABASE STORAGE & LEADS
        # ───────────────────────────────────────────────────────────────
        Message.objects.create(session=session, role='model', text=reply_text, generated_by=generated_by)

        # Trigger Lead Save if WA generator is present
        if '[ACTION:WA_BUTTON:' in reply_text:
            extracted = _extract_service_request_from_history(session)
            ServiceRequest.objects.get_or_create(
                session=session,
                defaults={
                    'name': extracted.get('name', 'N/A'),
                    'phone': extracted.get('phone', 'N/A'),
                    'email': extracted.get('email', ''),
                    'brand': extracted.get('brand', ''),
                    'model_number': extracted.get('model', ''),
                    'issue_description': 'Captured via Chatbot — see session for details.',
                    'status': 'new',
                }
            )

        return Response({"reply": reply_text})


class DiagnoseView(APIView):
    def post(self, request):
        base64_image = request.data.get('image', '').strip()
        mime_type = request.data.get('mime_type', 'image/jpeg')
        session_id = request.data.get('session_id', '')

        if not base64_image:
            return Response({"error": "image base64 string is required"}, status=400)

        prompt_text = (
            "You are a Master Audio Technician at AHA Technologies. "
            "Inspect this PCB/electronic component image. "
            "List up to 2 bullet points of clearly visible faults (swollen caps, burnt traces, cold joints, corrosion). "
            "If no obvious faults are visible say so and recommend bench diagnosis. "
            "Be brief and professional."
        )

        payload = {
            "contents": [{
                "parts": [
                    {"text": prompt_text},
                    {"inlineData": {"mimeType": mime_type, "data": base64_image}}
                ]
            }],
            "generationConfig": {"temperature": 0.05, "maxOutputTokens": 200}
        }

        # LAYER 2 (VISUAL): Check if user passed a semantic text hint before hitting Gemini Vision
        reply_text = ""
        is_api_error = False
        
        known_issue_hint = request.data.get('symptom_hint', '').strip().lower()
        if known_issue_hint:
            known_match = KnownVisualIssue.objects.filter(symptom_name__icontains=known_issue_hint).first()
            if known_match:
                reply_text = known_match.diagnosis_text

        # LAYER 3: Gemini Vision API (if no known visual fault hit)
        if not reply_text:
            if not settings.GEMINI_VISUAL_API_KEY:
                reply_text = "❌ **System Configuration Error:** The `GEMINI_VISUAL_API_KEY` environment variable is missing on the server. Please run `export GEMINI_VISUAL_API_KEY='your_key'` in your VS Code terminal and restart."
            else:
                try:
                    resp = requests.post(
                        f"{GEMINI_VISUAL_URL}?key={settings.GEMINI_VISUAL_API_KEY}",
                        json=payload,
                        timeout=30
                    )
                    data = resp.json()

                    if resp.status_code != 200 or "error" in data:
                        print("GEMINI API ERROR:", data)
                        is_api_error = True
                    else:
                        reply_text = data["candidates"][0]["content"]["parts"][0]["text"]

                except (requests.Timeout, requests.ConnectionError, Exception) as e:
                    print("EXCEPTION IN GEMINI API DIAGNOSE:", e)
                    is_api_error = True

        # Fallback for Visual Diagnostic quota issues
        if is_api_error:
            reply_text = "⚠️ **High Server Load:** We are currently unable to automatically process this image via AI. However, our physical technicians are ready to help. Please use the **Request Service** button below or contact us at **+91 99646 89378** to book a bench diagnostic slot."

        # Ensure DB saves it regardless of whether it's an error state
        session = None
        if session_id:
            session, _ = ChatSession.objects.get_or_create(session_id=session_id)

        DiagnosticLog.objects.create(
            session=session,
            analysis_result=reply_text,
            mime_type=mime_type
        )

        return Response({"reply": reply_text})


class HealthView(APIView):
    def get(self, request):
        return Response({
            "status": "ok",
            "sessions": ChatSession.objects.count(),
            "service_requests": ServiceRequest.objects.count(),
        })

class LeadSubmitView(APIView):
    def post(self, request):
        name = request.data.get('name', '').strip()
        phone = request.data.get('phone', '').strip()
        email = request.data.get('email', '').strip()
        message = request.data.get('message', '').strip()
        
        if not name or not phone:
            return Response({"error": "Name and Phone are required.", "success": False}, status=400)
            
        ServiceRequest.objects.create(
            name=name,
            phone=phone,
            email=email,
            issue_description=message,
            status='new',
            notes="Submitted via Front-end Lead Form"
        )
        return Response({"success": True, "message": "Lead submitted successfully."})
