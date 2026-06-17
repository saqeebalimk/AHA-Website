import os
import sys
import django
import json
import requests
import time

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aha_backend.settings')
django.setup()

from chatbot_api.models import KnowledgeBaseArticle
from django.conf import settings

GEMINI_API_KEY = getattr(settings, 'GEMINI_API_KEY', None)
if not GEMINI_API_KEY:
    # Try environment variable fallback
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    print("FATAL: GEMINI_API_KEY not found in settings or environment.")
    sys.exit(1)

GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent"

print(f"Loaded GEMINI_API_KEY: {GEMINI_API_KEY[:8]}*****")

# Define target counts
CATEGORIES = [
    {"slug": "faq", "name": "General FAQ", "target_count": 100, "topics": "Definitions, Installation, Maintenance"},
    {"slug": "home_theatre", "name": "Home Theatre", "target_count": 150, "topics": "2.0, 5.1, 7.1.4, Speaker placement, Room size, AV receivers"},
    {"slug": "dolby_atmos", "name": "Dolby Atmos", "target_count": 150, "topics": "Height speakers, In-ceiling vs up-firing, Object audio, Netflix, Gaming"},
    {"slug": "amplifier_repair", "name": "Amplifier Repair", "target_count": 200, "topics": "Protect mode, No power, Overheating, Transistor failure, Bias, Relays"},
    {"slug": "pcb_repair", "name": "PCB Repair", "target_count": 150, "topics": "SMD repair, BGA, Capacitors, Short circuits, Tracks, Level 4 repair"},
    {"slug": "hdmi_repair", "name": "HDMI Board Repair", "target_count": 100, "topics": "No picture, HDMI handshake, ARC, eARC, HDCP, Switch IC failures"},
    {"slug": "dsp_channels", "name": "DSP & Lost Channels", "target_count": 100, "topics": "Missing channels, Muted surround, DSP failure, Audio dropouts"},
    {"slug": "speaker_repair", "name": "Speaker Repair", "target_count": 100, "topics": "Tweeters, Woofers, Crossovers, Voice coils, Cabinet issues"},
    {"slug": "subwoofer", "name": "Subwoofers", "target_count": 75, "topics": "No bass, Hum, Plate amplifier, Auto-on problems"},
    {"slug": "calibration", "name": "Calibration", "target_count": 100, "topics": "Audyssey, Dirac Live, YPAO, Room correction, Microphones"},
    {"slug": "hifi_audio", "name": "Hi-Fi Audio", "target_count": 150, "topics": "Stereo, DACs, Pre-amplifiers, Turntables, Streamers, Class A, AB, D"},
    {"slug": "commercial_audio", "name": "Commercial Audio", "target_count": 100, "topics": "70V/100V systems, Distributed audio, Dante, Conference rooms"},
    {"slug": "preventive_maintenance", "name": "Preventive Maintenance", "target_count": 75, "topics": "Cleaning, Fan replacement, Thermal inspection, Capacitor ageing"},
]

BATCH_SIZE = 10  # Max articles per API call to avoid timeouts

def generate_batch(category_dict, existing_questions):
    category_slug = category_dict["slug"]
    category_name = category_dict["name"]
    topics = category_dict["topics"]
    
    prompt = f"""You are a senior AV engineer, home theatre consultant, and Level-4 electronics repair specialist working for AHA Technologies, Bangalore.
Your task is to write {BATCH_SIZE} highly structured, professional engineering FAQ articles for the category: {category_name}.
Focus topics: {topics}.

CRITICAL INSTRUCTIONS:
- Be factually accurate, use professional engineering terminology.
- No marketing fluff. Keep it objective.
- Ensure these questions DO NOT exactly overlap with the following already generated questions: {json.dumps(existing_questions)}
- Explain technical concepts clearly. Mention practical examples, causes, symptoms, and repairability.

OUTPUT FORMAT:
You MUST return EXACTLY a valid JSON Array of objects. No markdown blocks, no text outside the array.
[
    {{
        "question": "The primary question...",
        "subcategory": "A relevant subcategory keyword (e.g., 'Protect Mode', 'Room Acoustics')",
        "keywords": "comma, separated, technical, keywords, for, search",
        "synonyms": "comma separated, alternative phrasings, of the question",
        "short_answer": "A concise 1-3 sentence answer.",
        "detailed_answer": "A detailed 100-250 word deep dive into the engineering specifics.",
        "related_topics": "3 to 5 related questions"
    }}
]"""

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.5, 
            "responseMimeType": "application/json"
        }
    }

    try:
        resp = requests.post(
            f"{GEMINI_URL}?key={GEMINI_API_KEY}",
            json=payload,
            timeout=45
        )
        if resp.status_code == 200:
            data = resp.json()
            json_text = data["candidates"][0]["content"]["parts"][0]["text"]
            # Fast safety clean if there's markdown around it
            if json_text.startswith("```json"):
                json_text = json_text[7:-3].strip()
            
            articles = json.loads(json_text)
            return articles
        else:
            print(f"API Error. Status: {resp.status_code}. Response: {resp.text}")
            return []
    except Exception as e:
        print(f"Exception during API call: {str(e)}")
        return []

print("\n--- AHA Technologies Knowledge Base Generator ---")
print("Warning: This script will perform hundreds of API calls and may consume significant Gemini Quota.")
input("Press Enter to begin or Ctrl+C to cancel...")

total_saved = 0

for cat in CATEGORIES:
    slug = cat["slug"]
    target = cat["target_count"]
    print(f"\n--- Generating {target} articles for {cat['name']} ---\n")
    
    # Check how many we already have
    existing_count = KnowledgeBaseArticle.objects.filter(category=slug).count()
    
    while existing_count < target:
        existing_qs = list(KnowledgeBaseArticle.objects.filter(category=slug).values_list('question_text', flat=True))
        # Keep the existing_qs context small, maybe last 30 questions
        recent_qs = existing_qs[-30:] if len(existing_qs) > 30 else existing_qs
        
        print(f"[{existing_count}/{target}] Requesting batch of {BATCH_SIZE}...")
        
        start_time = time.time()
        new_batch = generate_batch(cat, recent_qs)
        
        if not new_batch:
            print("Failed to get batch. Retrying in 10s...")
            time.sleep(10)
            continue
        
        added = 0
        for item in new_batch:
            # Check for duplicate question
            if KnowledgeBaseArticle.objects.filter(question_text=item.get("question", "")).exists():
                continue
                
            try:
                KnowledgeBaseArticle.objects.create(
                    category=slug,
                    subcategory=item.get("subcategory", "")[:100],
                    question_text=item.get("question", "")[:500],
                    short_answer=item.get("short_answer", ""),
                    answer_text=item.get("detailed_answer", ""),
                    keywords=item.get("keywords", ""),
                    synonyms=item.get("synonyms", ""),
                    related_topics=item.get("related_topics", "")
                )
                added += 1
            except Exception as e:
                print(f"Failed to save item: {e}")
                
        existing_count = KnowledgeBaseArticle.objects.filter(category=slug).count()
        total_saved += added
        print(f"Saved {added} new articles. Elapsed: {time.time() - start_time:.1f}s")
        
        # Respect rate limits
        time.sleep(2)
        
print(f"\n--- Done! Total new articles successfully generated: {total_saved} ---")
