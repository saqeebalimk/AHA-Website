"""
AHA Technologies - Expert System NLP Engine v2
A fully interruptible, domain-specific state machine with 40+ intents,
session memory, and dynamic WhatsApp handoff generation.
"""
import re
import urllib.parse


# ──────────────────────────────────────────────────────────────────────────────
# DOMAIN DEFINITIONS
# Each domain defines: description, ordered fields, and prompts per field.
# ──────────────────────────────────────────────────────────────────────────────
DOMAINS = {
    "HOME_THEATRE": {
        "desc": "Home Theatre Installation",
        "intro": "Great choice! Let's design your perfect home theatre. I just need a few quick details.",
        "fields": ["roomSize", "seating", "budget", "brand", "desiredSetup"],
        "prompts": {
            "roomSize":       "What are the **dimensions of your room** (e.g., 12ft × 15ft)?",
            "seating":        "What is the expected **seating capacity**?",
            "budget":         "Do you have an **approximate budget** in mind?",
            "brand":          "Do you have any **preferred brands** (e.g., Denon, Yamaha, Sony)?",
            "desiredSetup":   "What **speaker layout** are you looking for — 5.1, 7.1, or Dolby Atmos (5.1.2 / 7.1.2)?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Home Theatre Installation*.\n\n"
            "*Room Size:* {roomSize}\n"
            "*Seating Capacity:* {seating}\n"
            "*Budget:* {budget}\n"
            "*Preferred Brands:* {brand}\n"
            "*Desired Configuration:* {desiredSetup}\n\n"
            "Please advise on the installation process.\n\nThank you."
        ),
    },
    "DOLBY_ATMOS": {
        "desc": "Dolby Atmos Setup / Upgrade",
        "intro": "Happy to help with your Dolby Atmos upgrade! I'll need a few details.",
        "fields": ["currentSetup", "desiredSetup", "brand", "model"],
        "prompts": {
            "currentSetup":   "What is your **current speaker setup** (e.g., 5.1)?",
            "desiredSetup":   "What **Dolby Atmos layout** are you targeting (e.g., 5.1.2, 7.1.4)?",
            "brand":          "What is the **brand** of your AV receiver?",
            "model":          "What is the exact **model number** of the receiver?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Dolby Atmos Upgrade*.\n\n"
            "*Current Setup:* {currentSetup}\n"
            "*Desired Setup:* {desiredSetup}\n"
            "*Receiver Brand:* {brand}\n"
            "*Receiver Model:* {model}\n\n"
            "Please advise on the upgrade path.\n\nThank you."
        ),
    },
    "CALIBRATION": {
        "desc": "Acoustic Calibration Service",
        "intro": "We'd be happy to calibrate your system for the best possible sound. A few quick questions:",
        "fields": ["brand", "model", "roomSize", "config"],
        "prompts": {
            "brand":    "What is the **brand** of your AV receiver?",
            "model":    "What is the **model number**?",
            "roomSize": "What are the **dimensions of your room**?",
            "config":   "What is your **current speaker configuration** (e.g., 5.1, 7.1.2)?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require *Acoustic Calibration* for my home theatre.\n\n"
            "*Receiver Brand:* {brand}\n"
            "*Receiver Model:* {model}\n"
            "*Room Size:* {roomSize}\n"
            "*Speaker Config:* {config}\n\n"
            "Please advise on the calibration service.\n\nThank you."
        ),
    },
    "AMP_REPAIR": {
        "desc": "Amplifier Repair",
        "intro": "I'm sorry to hear about that. Let me help diagnose this.",
        "fields": ["brand", "model", "issue", "symptom"],
        "prompts": {
            "brand":   "What is the **brand** of the amplifier (e.g., Denon, Marantz, Yamaha)?",
            "model":   "What is the **model number**?",
            "issue":   "Could you briefly **describe the issue** you're facing?",
            "symptom": "Have you noticed any **overheating, unusual smells, or LED indicators**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Amplifier Repair*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n\n"
            "*Issue:*\n{issue}\n\n"
            "*Additional Observations:*\n{symptom}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "NO_POWER": {
        "desc": "No Power Condition / SMPS Repair",
        "intro": "A completely dead unit can be caused by SMPS, fuse, or PCB faults. Let me gather some details.",
        "fields": ["brand", "model", "symptom"],
        "prompts": {
            "brand":   "What is the **brand** of the dead device?",
            "model":   "What is the **model number**?",
            "symptom": "Have you noticed any **LED lights, unusual sounds, or a burning smell** before it died?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with a *No Power Condition*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n\n"
            "*Symptoms Observed:*\n{symptom}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "PROTECT_MODE": {
        "desc": "Protect Mode Fault",
        "intro": "Protect mode usually indicates an output stage or speaker load issue. Let me help diagnose this.",
        "fields": ["brand", "model", "symptom"],
        "prompts": {
            "brand":   "What is the **brand** of the amplifier?",
            "model":   "Please provide the **exact model number**.",
            "symptom": "Have you noticed any **overheating, burning smell, or recent speaker/wiring changes**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with a *Protect Mode Fault*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n\n"
            "*Additional Observations:*\n{symptom}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "DISTORTED_SOUND": {
        "desc": "Distorted Sound Issue",
        "intro": "Audio distortion can point to output transistor or clipping issues. Let me collect some details.",
        "fields": ["brand", "model", "channels"],
        "prompts": {
            "brand":    "What is the **brand** of your amplifier or receiver?",
            "model":    "What is the **model number**?",
            "channels": "Does the distortion occur on **all speakers** or only on **specific channels**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Distorted Sound*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n\n"
            "*Channels Affected:*\n{channels}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "HDMI_REPAIR": {
        "desc": "HDMI Board Repair",
        "intro": "HDMI faults can involve the board, switch IC, or the HDCP handshake. Let me get some details.",
        "fields": ["brand", "model", "issue"],
        "prompts": {
            "brand":  "Please tell me the **brand** of the AV receiver and the TV.",
            "model":  "What is the **model number** of the receiver?",
            "issue":  "Does the problem occur with **all HDMI inputs** or only **one source device**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with an *HDMI Board Repair*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n\n"
            "*HDMI Fault Description:*\n{issue}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "DSP_REPAIR": {
        "desc": "DSP Board Repair / Lost Channels",
        "intro": "Lost channels are often caused by DSP IC or solder joint failures. Let me get some details.",
        "fields": ["brand", "model", "channels"],
        "prompts": {
            "brand":    "Please tell me the **brand** of the receiver.",
            "model":    "What is the **model number**?",
            "channels": "Which **specific channels** are affected or completely lost?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *DSP Board Repair / Lost Channels*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n\n"
            "*Channels Affected:*\n{channels}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "PCB_REPAIR": {
        "desc": "PCB / Component-Level Repair",
        "intro": "Our engineers specialise in L4 component-level PCB repair. Let me gather the device details.",
        "fields": ["brand", "model", "issue"],
        "prompts": {
            "brand":  "What **brand** does this circuit board belong to?",
            "model":  "What is the **device model number**?",
            "issue":  "Could you briefly **describe the fault or symptom** observed?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *PCB / Component-Level Repair*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n\n"
            "*Fault Description:*\n{issue}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "SUBWOOFER": {
        "desc": "Subwoofer Problem",
        "intro": "Subwoofer faults can be the amp section, wiring, or low-pass filter. Let me collect some details.",
        "fields": ["brand", "model", "connections"],
        "prompts": {
            "brand":       "Please tell me the **make and model of both the receiver and the subwoofer**.",
            "model":       "What is the **exact model number** of the subwoofer?",
            "connections": "Is the subwoofer **powered on**, and have you checked the **cable connections**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with a *Subwoofer Problem*.\n\n"
            "*Brand / Receiver:* {brand}\n"
            "*Subwoofer Model:* {model}\n\n"
            "*Connection Details:*\n{connections}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "SURROUND": {
        "desc": "Surround / Rear Channel Issue",
        "intro": "Surround channel faults may be AVR settings, speaker wiring, or the DSP. Let me collect some details.",
        "fields": ["brand", "model", "config", "symptom"],
        "prompts": {
            "brand":   "What is the **brand** of your AV receiver?",
            "model":   "What is the **model number**?",
            "config":  "What **speaker configuration** are you using (e.g., 5.1, 7.1)?",
            "symptom": "Have you recently run **speaker calibration** or changed any **wiring or settings**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Surround / Rear Channel Issues*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n"
            "*Configuration:* {config}\n\n"
            "*Details:*\n{symptom}\n\n"
            "Please advise regarding the repair process.\n\nThank you."
        ),
    },
    "COMMERCIAL_AUDIO": {
        "desc": "Commercial Audio Systems",
        "intro": "We handle large-scale commercial audio installations. Let me get the project details.",
        "fields": ["commercialType", "zones", "issue"],
        "prompts": {
            "commercialType": "Is this for a **hotel, restaurant, retail store, or other venue**?",
            "zones":          "How many **zones or areas** need to be covered?",
            "issue":          "Could you describe the **issue or requirement** in more detail?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Commercial Audio Systems*.\n\n"
            "*Venue Type:* {commercialType}\n"
            "*Number of Zones:* {zones}\n\n"
            "*Requirement / Issue:*\n{issue}\n\n"
            "Please advise on how you can help.\n\nThank you."
        ),
    },
    "CONFERENCE_ROOM": {
        "desc": "Conference Room Audio Systems",
        "intro": "We design UC-grade conference room audio systems. Let me get the details.",
        "fields": ["issue", "equipment"],
        "prompts": {
            "issue":     "Are you experiencing **microphone issues, speaker problems, or connectivity interruptions**?",
            "equipment": "Please provide the **equipment details** if available (brand, model).",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Conference Room Audio Systems*.\n\n"
            "*Symptom / Issue:*\n{issue}\n\n"
            "*Equipment:*\n{equipment}\n\n"
            "Please advise on the service or upgrade.\n\nThank you."
        ),
    },
    "DISTRIBUTED_AUDIO": {
        "desc": "Distributed / Multi-Room Audio",
        "intro": "We specialise in multi-zone audio systems using AoIP and 70V/100V architectures. Let me get the details.",
        "fields": ["zones", "issue"],
        "prompts": {
            "zones": "How many **zones or rooms** are part of the system?",
            "issue": "What **specific issues** are you experiencing, or is this a new installation?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Distributed / Multi-Room Audio*.\n\n"
            "*Number of Zones:* {zones}\n\n"
            "*Requirement / Issue:*\n{issue}\n\n"
            "Please advise on the installation or repair.\n\nThank you."
        ),
    },
    "PREVENTIVE_MAINTENANCE": {
        "desc": "Preventive Maintenance",
        "intro": "Regular maintenance significantly extends equipment life. Let me collect the unit details.",
        "fields": ["brand", "model", "maintenanceType"],
        "prompts": {
            "brand":           "What is the **brand** of the equipment?",
            "model":           "What is the **model number**?",
            "maintenanceType": "Are you looking for **deep cleaning, fan replacement, impedance sweep**, or a **general inspection**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I would like to schedule *Preventive Maintenance*.\n\n"
            "*Brand:* {brand}\n"
            "*Model:* {model}\n"
            "*Service Required:* {maintenanceType}\n\n"
            "Please advise on scheduling.\n\nThank you."
        ),
    },
    "HIFI_AUDIO": {
        "desc": "Hi-Fi Audio Consulting",
        "intro": "Hi-Fi audio is all about accuracy and fidelity. Let me understand your requirements.",
        "fields": ["brand", "budget", "roomSize"],
        "prompts": {
            "brand":    "Do you have any **preferred Hi-Fi brands** (e.g., Naim, Arcam, Cambridge Audio)?",
            "budget":   "What is your **approximate budget** for the system?",
            "roomSize": "What are the **dimensions of your listening room**?",
        },
        "wa_template": (
            "Hi AHA Technologies,\n\n"
            "I require assistance with *Hi-Fi Audio System Consulting*.\n\n"
            "*Preferred Brands:* {brand}\n"
            "*Budget:* {budget}\n"
            "*Room Size:* {roomSize}\n\n"
            "Please advise on the ideal Hi-Fi setup.\n\nThank you."
        ),
    },
    "BOOK_SERVICE": {
        "desc": "Service Booking",
        "intro": (
            "Certainly! Which service would you like to book?\n\n"
            "[QUICK:Home Theatre Installation|Dolby Atmos Upgrade|Amplifier Repair|PCB Repair|Acoustic Calibration|Commercial Audio|Preventive Maintenance]"
        ),
        "fields": [],   # No fields; immediately presents menu
        "prompts": {},
        "wa_template": "",
    },
}

# ──────────────────────────────────────────────────────────────────────────────
# INTENT PATTERNS — Ordered from most-specific to least-specific
# ──────────────────────────────────────────────────────────────────────────────
INTENT_PATTERNS = [
    # --- Exact button metadata intents (highest priority) ---
    (r'^HOME_THEATRE$',           'HOME_THEATRE'),
    (r'^DOLBY_ATMOS$',            'DOLBY_ATMOS'),
    (r'^PCB_REPAIR$',             'PCB_REPAIR'),
    (r'^AMP_REPAIR$',             'AMP_REPAIR'),
    (r'^CALIBRATION$',            'CALIBRATION'),
    (r'^COMMERCIAL_AUDIO$',       'COMMERCIAL_AUDIO'),
    (r'^PREVENTIVE_MAINTENANCE$', 'PREVENTIVE_MAINTENANCE'),
    (r'^BOOK_SERVICE$',           'BOOK_SERVICE'),

    # --- Natural language: Booking ---
    (r'book (a )?(service|repair|appointment|diagnostic)',  'BOOK_SERVICE'),
    (r'schedule (a )?(service|repair|appointment)',         'BOOK_SERVICE'),
    (r'want to book',                                       'BOOK_SERVICE'),

    # --- Natural language: Faults & Repair ---
    (r'protect(ion)?( mode)?|safety mode|red light blinking', 'PROTECT_MODE'),
    (r'shut(s)? (off|down)|turn(s|ing)? (off|itself off)', 'PROTECT_MODE'),
    (r'no power|won\'t (turn|power) on|completely dead|not turning on|not powering on', 'NO_POWER'),
    (r'smps|power supply (issue|repair)',               'NO_POWER'),
    (r'distort(ed|ion)?|crackl(es|ing|e)|fuzzy',        'DISTORTED_SOUND'),
    (r'hdmi|no (picture|video)|arc|earc',               'HDMI_REPAIR'),
    (r'dsp|lost (audio )?channels?|channels? (missing|gone|lost)|center (speaker|channel)', 'DSP_REPAIR'),
    (r'subwoofer|sub (not|stopped) working|sub (hums|no bass)', 'SUBWOOFER'),
    (r'rear|surround|left channel|right channel',       'DSP_REPAIR'),
    (r'burning smell|burnt|smoke|overheat(ing)?',       'AMP_REPAIR'),
    (r'pcb|circuit board|component.level',              'PCB_REPAIR'),
    (r'amplifier (repair|fix|broken|dead|issue)',       'AMP_REPAIR'),
    (r'(amp|amplifier|receiver|avr) (not working|repair)', 'AMP_REPAIR'),

    # --- Natural language: Installation & Audio ---
    (r'room is|seating for|home theat(re|er)',          'HOME_THEATRE'),
    (r'install(ation)?',                                'HOME_THEATRE'),
    (r'dolby atmos',                                    'DOLBY_ATMOS'),
    (r'calibrat|audyssey|dirac|ypao',                   'CALIBRATION'),
    (r'balanced|calibration needed',                    'CALIBRATION'),
    (r'hi.?fi|high fidelity|stereo setup',              'HIFI_AUDIO'),

    # --- Natural language: Commercial ---
    (r'conference (room|audio)',                        'CONFERENCE_ROOM'),
    (r'commercial (audio|project)',                     'COMMERCIAL_AUDIO'),
    (r'distributed audio|multi.room|hotel audio|restaurant audio', 'DISTRIBUTED_AUDIO'),

    # --- Natural language: Maintenance ---
    (r'preventive maintenance|deep clean|impedance sweep', 'PREVENTIVE_MAINTENANCE'),
]

# ──────────────────────────────────────────────────────────────────────────────
# STATIC FAQs — instant answers without a flow
# ──────────────────────────────────────────────────────────────────────────────
FAQS = [
    (r'\b(phone|contact|call|reach|whatsapp)\b',   "You can reach AHA Technologies at **+91 99646 89378** or on WhatsApp:\n\n[ACTION:WA_BUTTON:https://wa.me/919964689378]"),
    (r'\b(location|address|where are you)\b',      "AHA Technologies is an engineering lab based in **Bangalore, India**. Please contact us at +91 99646 89378 to schedule a drop-off."),
    (r'\b(business hours|working hours|timing)\b', "We operate **Monday to Saturday, 10 AM – 7 PM IST**. You can also reach us 24/7 on WhatsApp."),
    (r'\b(how long|turnaround|days|time)\b',       "Standard bench diagnostics take **24–48 hours**. Full repairs depend on component availability, typically **3 to 7 working days**."),
    (r'\b(price|pricing|cost|charges|quote)\b',    "Pricing depends on the **exact model and bench diagnostic results**. We provide a detailed estimate after the initial inspection. There are no hidden charges."),
    (r'\b(warranty|guarantee|refund)\b',           "We offer a **30-day component warranty** on all replaced parts. Labour charges are non-refundable due to the technical nature of L4 repair."),
    (r'\b(what brands? do you|do you repair (all )?brands)\b',   "We work with all major AV brands including **Denon, Marantz, Yamaha, Sony, Onkyo, Pioneer, Polk Audio, Klipsch, KEF,** and more."),
    (r'what (is|are) (hi.?fi|high fidelity)',  "**Hi-Fi (High Fidelity)** audio aims to reproduce sound as accurately as possible — flat frequency response, minimal distortion, wide dynamic range. It's the opposite of over-processed consumer audio."),
    (r'what is dolby atmos',                 "**Dolby Atmos** is an object-based audio format that adds a height dimension to surround sound. Instead of fixed channels, sounds are placed in a 3D space — giving you audio that moves around and *above* you."),
    (r'what is 5\.1',                        "A **5.1 system** uses 5 speakers (Front L/R, Centre, Rear L/R) + 1 subwoofer. It's the standard for a cinematic home theatre experience."),
    (r'what is 7\.1',                        "A **7.1 system** adds two extra surround speakers to a 5.1 setup, for a more immersive surround envelope — ideal for larger rooms."),
    (r'what is (5\.1\.2|7\.1\.2|atmos layout)', "In Dolby Atmos notation, the third number denotes **height (overhead) speakers**. So **5.1.2** = 5 surround + 1 sub + 2 height speakers. **7.1.4** is a more immersive premium layout."),
    (r'\b(pcb repair|l4)\b',                       "Our **L4 (Level 4) PCB repair** involves diagnosing and replacing individual failed components on the circuit board — not swapping entire modules. We use BGA rework stations, microscopes, and precision soldering tools."),
]

DEFAULT_FALLBACK = (
    "I'd be happy to help! Could you clarify what you're looking for? "
    "For example, are you interested in **Home Theatre Installation**, **Amplifier Repair**, **Dolby Atmos**, or something else?\n\n"
    "[QUICK:Home Theatre|Dolby Atmos|Amplifier Repair|PCB Repair|Book a Service]"
)


# ──────────────────────────────────────────────────────────────────────────────
# INTENT DETECTION
# ──────────────────────────────────────────────────────────────────────────────
def detect_intent(text: str) -> str | None:
    """Returns the matched intent key or None."""
    t = text.strip()
    for pattern, intent in INTENT_PATTERNS:
        if re.search(pattern, t, re.IGNORECASE):
            return intent
    return None


# ──────────────────────────────────────────────────────────────────────────────
# ENTITY EXTRACTION & PROBABILITY ENGINE
# ──────────────────────────────────────────────────────────────────────────────
BRANDS = {
    "denon", "marantz", "yamaha", "onkyo", "pioneer", "sony", "cambridge audio",
    "anthem", "nad", "arcam", "rotel", "jbl", "klipsch", "kef", "polk", "svs", 
    "rel", "b&w", "monitor audio", "bose", "sonos"
}

MODEL_PATTERNS = [
    r'\bAVR-[XSA]?[0-9]{3,4}H?\b',
    r'\bRX-[VA][0-9]+\b',
    r'\bSR[0-9]{4}\b',
    r'\bTX-NR[0-9]{4}\b',
    r'\b[A-Z]{2,4}-[A-Z0-9]{3,7}\b'  # Generic fallback requires hyphen
]

FAULTS_PROBABILITY = {
    "PROTECT_MODE": "Protect mode is commonly caused by **Output Stage Faults (45%)**, **Shorted Speakers (30%)**, or **Power Supply Issues (15%)**.",
    "NO_POWER": "A completely dead unit is usually caused by **SMPS/Standby Board Failures (60%)**, **Blown Main Fuses (20%)**, or **MCU Faults (10%)**.",
    "DISTORTED_SOUND": "Audio distortion often points to **Output Transistor Bias Issues (40%)**, **Clipping from underpowering (30%)**, or **Pre-amp IC Failure (20%)**.",
    "HDMI_REPAIR": "HDMI failures are typically associated with **Surge/Lightning damage to the HDMI Board (50%)**, **Switch IC Failure (30%)**, or **HDCP Handshake Issues (20%)**.",
    "DSP_REPAIR": "Lost channels are frequently traced back to **DSP IC BGA Solder Fatigue (60%)** or **DAC Failures (30%)**.",
}

def extract_entities(text: str, current_data: dict) -> dict:
    """Proactively extracts Brands and Models so the user doesn't have to repeat themselves."""
    text_lower = text.lower()
    
    # Extract Brand - Allow overwrite if explicitly mentioned again
    for b in BRANDS:
        if b in text_lower:
            current_data["brand"] = b.title()
            break
                
    # Extract Model - Allow overwrite
    for pattern in MODEL_PATTERNS:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            current_data["model"] = match.group(0).upper()
            break
                
    return current_data

# ──────────────────────────────────────────────────────────────────────────────
# WHATSAPP TEMPLATE BUILDER
# ──────────────────────────────────────────────────────────────────────────────
def build_wa_button(domain_key: str, data: dict) -> str:
    domain = DOMAINS[domain_key]
    template = domain.get("wa_template", "")
    if not template:
        return ""
    # Fill in collected fields; any missing become 'N/A'
    for field in domain.get("fields", []):
        template = template.replace("{" + field + "}", data.get(field, "N/A"))
    wa_link = "https://wa.me/919964689378?text=" + urllib.parse.quote(template)
    return f"[ACTION:WA_BUTTON:{wa_link}]"


# ──────────────────────────────────────────────────────────────────────────────
# BOOK SERVICE MENU → DOMAIN REDIRECT
# ──────────────────────────────────────────────────────────────────────────────
BOOK_MENU_MAP = {
    "home theatre installation": "HOME_THEATRE",
    "dolby atmos upgrade":       "DOLBY_ATMOS",
    "amplifier repair":          "AMP_REPAIR",
    "pcb repair":                "PCB_REPAIR",
    "acoustic calibration":      "CALIBRATION",
    "commercial audio":          "COMMERCIAL_AUDIO",
    "preventive maintenance":    "PREVENTIVE_MAINTENANCE",
}


# ──────────────────────────────────────────────────────────────────────────────
# MAIN ENTRY POINT
# ──────────────────────────────────────────────────────────────────────────────
def get_heuristic_reply(session, user_text: str) -> str | None:
    """
    Returns a reply string or None (to fall through to Layer 2/3).
    Implements a fully interruptible state machine.
    """
    text = user_text.strip()
    text_lower = text.lower()
    data: dict = session.state_data or {}

    # ── 0. STATIC FAQ — highest priority, instant answer, no flow ──
    for pattern, answer in FAQS:
        if re.search(pattern, text_lower, re.IGNORECASE):
            # Only answer FAQ if user is NOT mid-flow asking a relevant flow question
            # (avoids stomping on answers like "Denon" matching branded keyword)
            if not session.current_intent or not data.get('current_focus'):
                return answer

    # ── 1. DETECT if this message carries a NEW INTENT ──
    new_intent = detect_intent(text)

    # ── 1.5. ALWAYS EXTRACT ENTITIES PROACTIVELY ──
    data = extract_entities(text, data)
    session.state_data = data
    session.save()

    # ── 2. INTERRUPTION CHECK ──
    # If we're mid-flow and a clear new intent arrives, reset and redirect.
    if session.current_intent and new_intent and new_intent != session.current_intent:
        session.current_intent = new_intent
        # Preserve extracted entities during topic switch
        session.state_data = {"intent": new_intent, "brand": data.get("brand", ""), "model": data.get("model", "")}
        session.save()
        data = session.state_data

    # ── 3. START NEW FLOW if no active intent ──
    elif not session.current_intent:
        if new_intent:
            session.current_intent = new_intent
            session.state_data = {"intent": new_intent, "brand": data.get("brand", ""), "model": data.get("model", "")}
            session.save()
            data = session.state_data
        else:
            return None  # Fall through to KB / Gemini

    # ── 4. HANDLE BOOK_SERVICE MENU ──
    if session.current_intent == 'BOOK_SERVICE':
        # Present menu if we haven't yet, otherwise map choice → real domain
        if not data.get('menu_shown'):
            data['menu_shown'] = True
            session.state_data = data
            session.save()
            return DOMAINS['BOOK_SERVICE']['intro']

        # User replied with a menu choice — try to map it
        matched_domain = None
        for key, domain_key in BOOK_MENU_MAP.items():
            if key in text_lower:
                matched_domain = domain_key
                break
        if matched_domain:
            session.current_intent = matched_domain
            session.state_data = {"intent": matched_domain}
            session.save()
            data = session.state_data
            # Fall through to domain flow below
        else:
            return "I didn't catch that. Please choose one of the services listed above."

    # ── 5. ACTIVE DOMAIN FLOW ──
    domain_key = session.current_intent
    domain = DOMAINS.get(domain_key)
    if not domain:
        session.current_intent = None
        session.save()
        return None

    # Show intro once when flow starts
    if not data.get('intro_shown'):
        data['intro_shown'] = True
        
        # Override intro with Probability Engine Data if it exists
        if domain_key in FAULTS_PROBABILITY:
            intro_msg = f"{FAULTS_PROBABILITY[domain_key]} Let me gather the specifics of your device."
        else:
            intro_msg = domain['intro']

        # Find first UNANSWERED field (avoids asking "What Brand" if already extracted!)
        first_unanswered_field = None
        for field in domain["fields"]:
            if not data.get(field):
                first_unanswered_field = field
                break

        if first_unanswered_field:
            data['current_focus'] = first_unanswered_field
            session.state_data = data
            session.save()
            return f"{intro_msg}\n\n{domain['prompts'][first_unanswered_field]}"
        else:
            # Everything somehow answered already
            return intro_msg

    # ── 5a. SAVE ANSWER to current_focus ──
    focus = data.get('current_focus')
    if focus and not data.get(focus):
        data[focus] = text
        data['current_focus'] = None

    # ── 5b. FIND NEXT UNANSWERED FIELD ──
    for field in domain["fields"]:
        if not data.get(field):
            data['current_focus'] = field
            session.state_data = data
            session.save()
            return domain["prompts"][field]

    # ── 5c. ALL FIELDS GATHERED — Generate WhatsApp Handoff ──
    wa_button = build_wa_button(domain_key, data)
    desc = domain['desc']

    # Reset session
    session.current_intent = None
    session.state_data = {}
    session.save()

    return (
        f"Thank you for providing all the details for your **{desc}** request. "
        "I have compiled a professional summary for our engineers. "
        "Tap the button below to send it directly on WhatsApp — "
        "the message will carry your full context so you won't need to repeat yourself.\n\n"
        f"{wa_button}"
    )


DEFAULT_FALLBACK_MESSAGE = DEFAULT_FALLBACK
