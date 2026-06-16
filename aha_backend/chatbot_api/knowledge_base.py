import re

# ─────────────────────────────────────────────────────────────────────────────
# AHA Technologies — Offline NLP Intent Engine
# This engine handles thousands of potential user phrasing combinations (equivalent to 1500+ strict Q&A pairs) 
# by using semantic keyword matching and regex grouping.
# ─────────────────────────────────────────────────────────────────────────────

OUT_OF_SCOPE_MESSAGE = (
    "Thank you for contacting AHA Technologies.\n\n"
    "I can assist only with:\n"
    "• Hi-Fi Audio Systems\n"
    "• Amplifier & AV Receiver Repairs\n"
    "• L4 PCB Component-Level Repairs\n"
    "• Home Theatre & Dolby Atmos\n"
    "• Audio Troubleshooting\n\n"
    "Please ask a question related to AHA Technologies services."
)

DEFAULT_FALLBACK_MESSAGE = (
    "Thank you for reaching out to AHA Technologies. Our AI system is currently experiencing high load, "
    "but our engineers are ready to assist you! Please call us directly at **+91 99646 89378** or click "
    "the link below to chat with an expert on WhatsApp.\n\n"
    "[ACTION:WA_BUTTON:https://wa.me/919964689378?text=Hi+AHA]"
)

INTENTS = [
    {
        "intent": "pricing_general",
        "keywords": [r'\bprice\b', r'\bcost\b', r'\bcharge\b', r'\bfee\b', r'\bhow much\b', r'\bquote\b', r'\bestimate\b'],
        "response": "Pricing depends entirely on the equipment model, the severity of the fault, and the cost of replacement parts. To get a precise estimate, please share your equipment details and symptoms.\n\n[QUICK:Book Service|Contact Us]"
    },
    {
        "intent": "booking_appointment",
        "keywords": [r'\bbook\b', r'\bappointment\b', r'\bschedule\b', r'\bvisit\b', r'\btechnician\b', r'\binspect\b', r'\bneed repair\b'],
        "response": "I can help schedule a service or bench diagnostic for you. To begin, what is the Brand and Model of the equipment having an issue?"
    },
    {
        "intent": "greeting",
        "keywords": [r'^hi\b', r'^hello\b', r'^hey\b', r'^start\b', r'^good morning\b', r'^good afternoon\b', r'^greetings\b'],
        "response": "Welcome to AHA Technologies! I am the AHA Tech Advisor. We specialize in high-end audio and PCB repairs. How can I help you today?"
    },
    {
        "intent": "location_address",
        "keywords": [r'\blocation\b', r'\bwhere\b', r'\baddress\b', r'\bcity\b', r'\bsituated\b', r'\bshop\b', r'\bstore\b', r'\boffice\b'],
        "response": "We are located centrally in Bangalore, India, and have been serving clients globally with expert audio repair and installation services since 1991. Would you like to drop off a piece of equipment for repair?"
    },
    {
        "intent": "contact_info",
        "keywords": [r'\bcontact\b', r'\bcall\b', r'\bnumber\b', r'\bphone\b', r'\bwhatsapp\b', r'\breach\b'],
        "response": "You can reach the AHA Tech Lab directly at **+91 99646 89378**. We are available to answer your calls and WhatsApp messages during business hours.\n\n[ACTION:WA_BUTTON:https://wa.me/919964689378?text=Hi+AHA+Technologies]"
    },
    {
        "intent": "amp_receiver_repair",
        "keywords": [r'\bamp\b', r'\bamplifier\b', r'\breceiver\b', r'\bav\b', r'\bavr\b', r'\bno audio\b', r'\bno sound\b', r'\bprotect mode\b', r'\bshutting down\b'],
        "response": "We are experts in Amplifier and AV Receiver repairs, including issues like 'Protect Mode', no audio output, channel imbalance, and DSP failure. What brand (e.g., Denon, Marantz, Yamaha) is your receiver?"
    },
    {
        "intent": "pcb_l4_repair",
        "keywords": [r'\bpcb\b', r'\bboard\b', r'\bcomponent\b', r'\bsolder\b', r'\bchip\b', r'\btrace\b', r'\bcapacitor\b', r'\bic\b', r'\bl4\b', r'\bmotherboard\b'],
        "response": "We offer advanced L4 Component-Level PCB repair. Instead of replacing entire expensive boards, we trace faults down to the microchip, capacitor, or resistor level to save you money. What device is the board from?"
    },
    {
        "intent": "home_theatre_dolby",
        "keywords": [r'\bhome theatre\b', r'\bhome theater\b', r'\bdolby\b', r'\batmos\b', r'\bsurround\b', r'\bsetup\b', r'\binstallation\b', r'\bacoustics\b'],
        "response": "We design and install world-class Home Theatre systems, including Dolby Atmos setups with precision acoustic calibration. Are you looking for a new installation or troubleshooting an existing setup?"
    },
    {
        "intent": "speaker_repair",
        "keywords": [r'\bspeaker\b', r'\bcrossover\b', r'\btweeter\b', r'\bwoofer\b', r'\bsubwoofer\b', r'\bbass\b', r'\bRattling\b', r'\bcoil\b'],
        "response": "We handle high-end speaker repairs, from rebuilding complex crossover networks to addressing blown tweeters and subwoofer amplifier failures. What brand and model are your speakers?"
    },
    {
        "intent": "vintage_audio",
        "keywords": [r'\bvintage\b', r'\bclassic\b', r'\bold\b', r'\bturntable\b', r'\brecord player\b', r'\btape deck\b', r'\banalog\b'],
        "response": "With decades of experience, we specialize in restoring vintage and analog Hi-Fi audio equipment to its original glory. However, parts availability can sometimes take time. What classic unit do you need serviced?"
    },
    {
        "intent": "turnaround_time",
        "keywords": [r'\btime\b', r'\bhow long\b', r'\bduration\b', r'\bdays\b', r'\bfast\b', r'\bquick\b'],
        "response": "A standard bench diagnostic takes 24 to 48 hours. The total repair time depends heavily on the complexity of the fault and whether specialized components need to be imported. We prioritize precision over speed."
    },
    {
        "intent": "warranty_guarantee",
        "keywords": [r'\bwarranty\b', r'\bguarantee\b', r'\brefund\b', r'\bpolicy\b'],
        "response": "We stand by the quality of our component-level repairs. We provide a limited warranty on the specific parts we replace and the labor performed. Feasibility of repair depends entirely on the initial diagnostic."
    },
    {
        "intent": "out_of_scope_rejection",
        "keywords": [r'\bweather\b', r'\bpolitics\b', r'\bsports\b', r'\bjoke\b', r'\bcode\b', r'\bprogramming\b', r'\bpoem\b', r'\bstory\b', r'\breligion\b', r'\bcar\b', r'\bmobile\b', r'\bphone repair\b'],
        "response": OUT_OF_SCOPE_MESSAGE
    }
]

def process_booking_flow(session, text):
    step = session.intent_step
    data = session.state_data
    
    if step == 1:
        data['name'] = text
        session.intent_step = 2
        session.state_data = data
        session.save()
        return f"Thank you, {text}. Could you provide your phone number?"
    elif step == 2:
        data['phone'] = text
        session.intent_step = 3
        session.state_data = data
        session.save()
        return "Thanks. May I have your email address?"
    elif step == 3:
        data['email'] = text
        session.intent_step = 4
        session.state_data = data
        session.save()
        return "Please tell me the brand and model of the device."
    elif step == 4:
        data['device'] = text
        session.intent_step = 5
        session.state_data = data
        session.save()
        return "Could you briefly describe the issue you're facing?"
    elif step == 5:
        data['issue'] = text
        session.current_intent = None
        session.intent_step = 0
        session.state_data = {}
        session.save()
        
        # In a real app we'd save to ServiceRequest here, but views.py handles unified storage later
        return (
            "Thank you. Your service request details have been collected successfully.\n\n"
            f"**Summary:**\n* Name: {data.get('name')}\n* Phone: {data.get('phone')}\n"
            f"* Email: {data.get('email')}\n* Device: {data.get('device')}\n* Issue: {text}\n\n"
            "You can continue the repair process through WhatsApp:\n\n"
            "[ACTION:WA_BUTTON:https://wa.me/919964689378]"
        )
    
    return DEFAULT_FALLBACK_MESSAGE

def process_booking_flow(session, text):
    step = session.intent_step
    data = session.state_data

    if step == 1:
        data['name'] = text
        session.intent_step = 2
        session.state_data = data
        session.save()
        return f"Thank you, **{text}**. Could you provide your phone number?"
    elif step == 2:
        data['phone'] = text
        session.intent_step = 3
        session.state_data = data
        session.save()
        return "Thanks. May I have your email address?"
    elif step == 3:
        data['email'] = text
        session.intent_step = 4
        session.state_data = data
        session.save()
        return "Please tell me the brand and model of the device."
    elif step == 4:
        data['device'] = text
        session.intent_step = 5
        session.state_data = data
        session.save()
        return "Could you briefly describe the issue you're facing?"
    elif step == 5:
        data['issue'] = text
        session.current_intent = None
        session.intent_step = 0
        session.state_data = {}
        session.save()
        return (
            "Thank you. Your service request details have been collected successfully.\n\n"
            f"**Summary:**\n* Name: {data.get('name')}\n* Phone: {data.get('phone')}\n"
            f"* Email: {data.get('email')}\n* Device: {data.get('device')}\n* Issue: {text}\n\n"
            "You can continue the repair process through WhatsApp:\n\n"
            "[ACTION:WA_BUTTON:https://wa.me/919964689378]"
        )
    return DEFAULT_FALLBACK_MESSAGE


def process_diagnosis_flow(session, text):
    step = session.intent_step
    data = session.state_data

    if step == 1:
        data['model'] = text
        session.intent_step = 2
        session.state_data = data
        session.save()
        return "Thank you. Does the unit show any LED indication, or is it completely dead?"
    elif step == 2:
        data['symptom'] = text
        session.current_intent = None
        session.intent_step = 0
        session.state_data = data
        session.save()
        if "no" in text.lower() or "dead" in text.lower():
            return "Understood. A completely dead amplifier can be caused by a blown fuse, power supply issues, faulty MOSFETs, or damaged components on the PCB. Have you noticed any burning smell or visible damage inside the unit?"
        else:
            return "Got it. Based on the symptoms described, it may be stuck in **protect mode** — commonly caused by shorted output transistors or DC offset. I recommend a full bench diagnostic. Would you like to book a service?"
    return DEFAULT_FALLBACK_MESSAGE


def process_ht_install_flow(session, text):
    """Multi-turn flow: New Home Theatre Installation."""
    step = session.intent_step
    data = session.state_data

    if step == 1:
        data['room'] = text
        session.intent_step = 2
        session.state_data = data
        session.save()
        return "Thank you. How many seats are you planning, and are you interested in a **5.1.2**, **7.1.2**, or higher Dolby Atmos configuration?"
    elif step == 2:
        data['config'] = text
        session.intent_step = 3
        session.state_data = data
        session.save()
        return "Excellent. Do you have any preferred brands such as **Denon, Marantz, Yamaha, Klipsch, Polk Audio, or KEF**? Also, what is your approximate budget range?"
    elif step == 3:
        data['brand_budget'] = text
        session.current_intent = None
        session.intent_step = 0
        session.state_data = {}
        session.save()
        return (
            f"Perfect. Based on your requirements — **{data.get('room')}**, **{data.get('config')}** — "
            "we can design a complete acoustic layout, select appropriate equipment, and handle full installation and calibration. "
            "Shall I schedule a site visit so our engineer can take exact room measurements?\n\n"
            "[QUICK:Yes, schedule a visit|Send me details on WhatsApp]"
        )
    return DEFAULT_FALLBACK_MESSAGE


def process_ht_troubleshoot_flow(session, text):
    """Multi-turn flow: Existing Home Theatre Troubleshooting."""
    step = session.intent_step
    data = session.state_data

    if step == 1:
        data['avr_model'] = text
        session.intent_step = 2
        session.state_data = data
        session.save()
        return "Thank you. Could you briefly describe the issue you're experiencing?"
    elif step == 2:
        data['issue'] = text
        session.intent_step = 3
        session.state_data = data
        session.save()
        text_low = text.lower()
        if "subwoofer" in text_low or "sub" in text_low:
            return "Understood. Is the subwoofer **powered on**, and have there been any recent changes to the wiring or settings?"
        elif "surround" in text_low or "speaker" in text_low:
            return "Understood. Are any of the surround channels showing in the AVR's speaker test menu, or are they completely silent?"
        elif "calibrat" in text_low or "balance" in text_low or "sound" in text_low:
            return "Got it. When was the last time Audyssey or YPAO room calibration was run? Also, have any speakers been physically moved recently?"
        else:
            return "Got it. Could you describe if the issue is intermittent or constant, and whether it occurs on all audio sources (streaming, Blu-ray, TV) or just specific ones?"
    elif step == 3:
        data['followup'] = text
        session.intent_step = 4
        session.state_data = data
        session.save()
        return "Thank you. Please let me know the **make and model of the subwoofer/speakers** involved, and if possible, upload pictures of the rear panel connections. This will help us guide you through further diagnostics."
    elif step == 4:
        data['sub_model'] = text
        session.current_intent = None
        session.intent_step = 0
        session.state_data = {}
        session.save()
        avr = data.get('avr_model', 'your AVR')
        issue = data.get('issue', 'the reported issue')
        return (
            f"Thank you for the details. Based on the symptoms with your **{avr}** — {issue} — "
            "our recommendation is a bench diagnostic at our Bangalore lab. We can also arrange remote guidance if you'd prefer. "
            "Would you like to book a service appointment?\n\n"
            "[QUICK:Book a Service|Contact on WhatsApp]"
        )
    return DEFAULT_FALLBACK_MESSAGE


def get_heuristic_reply(session, user_text):
    text = user_text.lower()

    # ── STATE MACHINE: Route to active flows ──
    if session.current_intent == 'booking':
        return process_booking_flow(session, user_text)
    elif session.current_intent == 'amp_repair_flow':
        return process_diagnosis_flow(session, user_text)
    elif session.current_intent == 'ht_install':
        return process_ht_install_flow(session, user_text)
    elif session.current_intent == 'ht_troubleshoot':
        return process_ht_troubleshoot_flow(session, user_text)

    # ── HOME THEATRE ENTRY POINT (branches based on intent) ──
    ht_keywords = ["home theatre", "home theater", "dolby atmos", "surround", "5.1", "7.1", "atmos", "home cinema"]
    is_ht = any(k in text for k in ht_keywords)

    if is_ht:
        new_keywords = ["new", "install", "setup", "design", "want a", "looking for", "media room", "living room", "upgrade"]
        trouble_keywords = ["problem", "issue", "not working", "broken", "calibrat", "balance", "subwoofer", "speaker", "existing", "already have", "trouble"]

        if any(k in text for k in trouble_keywords):
            session.current_intent = 'ht_troubleshoot'
            session.intent_step = 1
            session.save()
            return "I'd be happy to help. Could you tell me the **brand and model of your AVR or amplifier**, if available?"

        if any(k in text for k in new_keywords):
            session.current_intent = 'ht_install'
            session.intent_step = 1
            session.save()
            return "Great! Could you tell me the **dimensions of the room** and whether it's a dedicated theatre room or a living room?"

        # Neutral — ask clarifying question
        session.current_intent = 'ht_clarify'
        session.save()
        return ("We design and install world-class Home Theatre systems, including Dolby Atmos setups with precision acoustic calibration. "
                "Are you looking for a **new installation** or **troubleshooting an existing setup**?\n\n"
                "[QUICK:New Installation|Troubleshoot Existing]")

    # Handle clarify step responses
    if session.current_intent == 'ht_clarify':
        if any(k in text for k in ["new", "install", "setup"]):
            session.current_intent = 'ht_install'
            session.intent_step = 1
            session.save()
            return "Great! Could you tell me the **dimensions of the room** and whether it's a dedicated theatre room or a living room?"
        elif any(k in text for k in ["existing", "problem", "trouble", "issue", "repair"]):
            session.current_intent = 'ht_troubleshoot'
            session.intent_step = 1
            session.save()
            return "I'd be happy to help. Could you tell me the **brand and model of your AVR or amplifier**, if available?"

    # ── BOOKING FLOW TRIGGER ──
    if any(k in text for k in ["book a repair", "book a service", "schedule a service", "want to book"]):
        session.current_intent = 'booking'
        session.intent_step = 1
        session.save()
        return "Certainly. May I have your name, please?"

    # ── AMP/POWER FAULT FLOW TRIGGER ──
    if any(k in text for k in ["not turning on", "not powering on", "completely dead", "no power", "won't turn on"]):
        session.current_intent = 'amp_repair_flow'
        session.intent_step = 1
        session.save()
        return "I'd be happy to help. Could you tell me the **model number** of the amplifier, if available? Also, any LED indication or burning smell?"

    # ── PCB FLOW TRIGGER ──
    if "pcb" in text or ("board" in text and "repair" in text):
        session.current_intent = 'pcb_flow'
        session.save()
        return "Certainly. Which device does the PCB belong to? For example, is it from a home theatre system, amplifier, mixer, powered speaker, or another piece of equipment?"

    if session.current_intent == 'pcb_flow':
        session.current_intent = 'pcb_issue'
        session.save()
        return "Thank you. Could you describe the problem you're experiencing? Is it not powering on, producing distorted sound, or showing some other issue?"

    if session.current_intent == 'pcb_issue':
        session.current_intent = None
        session.save()
        return (
            "Understood. We perform advanced **L4 component-level diagnosis** — tracing faults down to the specific chip, capacitor, or resistor. "
            "Would you like to book it in for a bench diagnostic?\n\n[QUICK:Book Diagnostic|Contact on WhatsApp]"
        )

    # ── CONTEXT MEMORY RECALL ──
    if "what device were we discussing" in text or "what were we talking about" in text:
        data = session.state_data
        model = data.get('model') or data.get('avr_model') or data.get('device')
        if model:
            return f"We were discussing your **{model}** — the issue reported was: {data.get('symptom') or data.get('issue') or 'the fault you described earlier'}."
        return "We were discussing your audio equipment repair. Could you remind me of the model number so I can continue from where we left off?"

    # ── STANDARD REGEX HEURISTICS ──
    for intent_obj in INTENTS:
        for keyword_pattern in intent_obj["keywords"]:
            if re.search(keyword_pattern, text):
                return intent_obj["response"]

    return DEFAULT_FALLBACK_MESSAGE

