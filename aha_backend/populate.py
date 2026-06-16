from chatbot_api.models import KnowledgeBaseArticle, KnownVisualIssue

KnowledgeBaseArticle.objects.all().delete()
KnownVisualIssue.objects.all().delete()

print("Populating Knowledge Base Articles (Layer 2 DB)...")

articles = [
    {
        "q": "What services do you offer?",
        "a": "We provide expert L4 PCB Component-Level repairs, Amplifier and AV Receiver tuning, and Dolby Atmos Home Theatre installations. What specifically do you need help with?",
        "k": "services, what do you sell, what products do you have, show products, available items, what do you do"
    },
    {
        "q": "What is your refund policy?",
        "a": "We offer a 30-day guarantee on specific replaced components. Due to the complex nature of L4 repair, labor charges are non-refundable. Does your fixed unit have a recurring issue?",
        "k": "refund, guarantee, money back, warranty, broken again"
    },
    {
        "q": "How long does a repair take?",
        "a": "Standard bench diagnostics take 24 to 48 hours. The total repair time depends heavily on component availability, often taking 3 to 7 working days. Would you like to schedule a drop-off?",
        "k": "how long, duration, days, time, fast, quick, turnaround"
    },
    {
        "q": "Do you repair Denon receivers?",
        "a": "Yes! Denon and Marantz AV Receivers are our specialty. Are you experiencing the red blinking 'Protect Mode' issue?",
        "k": "denon, marantz, avr, receiver, av receiver, protect mode"
    },
    {
        "q": "Do you fix speakers or subwoofers?",
        "a": "Absolutely. We rebuild passive crossover networks, fix blown tweeters, and repair internal subwoofer amps. What brand is the speaker?",
        "k": "speaker, sub, subwoofer, tweeter, crossover, bass, rattling"
    }
]

for a in articles:
    KnowledgeBaseArticle.objects.create(
        question_text=a['q'],
        answer_text=a['a'],
        keywords=a['k'],
        category='faq'
    )

print("Populating known visual issues...")

KnownVisualIssue.objects.create(
    symptom_name="swollen capacitor",
    category="pcb",
    diagnosis_text="I can see a swollen/leaking electrolytic capacitor on the board. This often causes power failure or audio distortion. We easily replace these at our lab. [QUICK:Book Service|Contact Us]"
)

KnownVisualIssue.objects.create(
    symptom_name="burnt trace",
    category="pcb",
    diagnosis_text="The PCB trace appears burnt or broken, likely due to a short circuit or thermal overload. We can rebuild the trace using L4 microsoldering techniques. [QUICK:Book Service|Contact Us]"
)

print(f"Done. KnowledgeBase count: {KnowledgeBaseArticle.objects.count()} | KnownVisual: {KnownVisualIssue.objects.count()}")
