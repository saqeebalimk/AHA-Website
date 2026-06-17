from chatbot_api.models import KnowledgeBaseArticle, KnownVisualIssue

KnowledgeBaseArticle.objects.all().delete()
KnownVisualIssue.objects.all().delete()

print("Populating Knowledge Base Articles (Layer 2 DB)...")

articles = [
    # 1. Hi-Fi Audio Principles
    {"q": "What is Hi-Fi audio?", "a": "Hi-Fi (High Fidelity) audio aims to reproduce sound as accurately as possible, just as the artist intended. It emphasizes flat frequency response, minimal distortion, and a wide dynamic range without artificially boosting bass or treble.", "k": "hi-fi, high fidelity, flat frequency, distortion, dynamic range"},
    {"q": "Why is Hi-Fi audio important?", "a": "Hi-Fi systems provide a more natural and detailed listening experience. They focus on accuracy and clarity rather than exaggerated sound effects, making them ideal for music enthusiasts.", "k": "important, natural, listening experience, accuracy, clarity"},
    
    # 2. Stereo Audio (2.0 / 2.1)
    {"q": "What is a 2.0 stereo system?", "a": "A 2.0 stereo setup consists of left and right speakers that create a stereo image for accurate music reproduction.", "k": "2.0, stereo, left and right, music reproduction"},
    {"q": "What is the difference between 2.0 and 2.1?", "a": "A 2.1 system adds a subwoofer to the left and right speakers, providing deeper bass and improved low-frequency performance.", "k": "2.1, difference, subwoofer, deep bass"},
    {"q": "Is a 2.1 system good for music?", "a": "Yes. A properly configured 2.1 system delivers excellent music performance while extending bass response through the subwoofer.", "k": "2.1 good for music, subwoofer music performance"},
    
    # 3. Home Theatre & Dolby 5.1
    {"q": "What is a 5.1 home theatre system?", "a": "A traditional 5.1 setup consists of: Left speaker, Center speaker, Right speaker, Two surround speakers, One subwoofer. This configuration creates an immersive cinematic experience.", "k": "5.1, home theatre, surround, cinematic"},
    {"q": "How many speakers are required for 5.1 surround sound?", "a": "Five speakers and one subwoofer are used in a standard 5.1 home theatre configuration.", "k": "how many speakers, 5.1, standard configuration"},
    
    # 4. Dolby Atmos
    {"q": "What is Dolby Atmos?", "a": "Dolby Atmos is an object-based audio technology that creates three-dimensional sound by adding height channels, allowing sounds to move around and above the listener.", "k": "dolby atmos, object-based, 3d sound, height channels"},
    {"q": "What is a 5.1.2 Atmos system?", "a": "A 5.1.2 system includes: Front Left, Center, Front Right, Two Surround Speakers, One Subwoofer, Two Height or Atmos Speakers. This creates a more immersive audio bubble.", "k": "5.1.2, atmos setup, height speakers"},
    {"q": "Do you install Dolby Atmos systems?", "a": "Yes. AHA Technologies designs and installs premium Dolby Atmos home theatre systems with precision acoustic calibration for optimal performance.", "k": "install atmos, setup dolby atmos, acoustic calibration"},
    
    # 5. Component-Level Repair (L4 PCB Repair)
    {"q": "What is Level 4 PCB repair?", "a": "Level 4 (L4) repair involves diagnosing and replacing failed electronic components at the board level instead of replacing entire modules. This approach is often more cost-effective and sustainable.", "k": "level 4, l4, pcb repair, component-level"},
    {"q": "Do you repair electronic boards?", "a": "Yes. AHA Technologies specializes in component-level diagnostics and PCB restoration using advanced tools such as infrared BGA rework stations, microscopes, and precision desoldering equipment.", "k": "repair electronic boards, pcb restoration, bga rework"},
    {"q": "Why repair instead of replacing the whole board?", "a": "Component-level repair helps preserve expensive equipment and is often more economical than replacing complete assemblies.", "k": "repair vs replace, replace whole board, economical"},
    
    # 6. SMPS & Power Supply Repair
    {"q": "Do you repair power supplies?", "a": "Yes. We diagnose and repair Switch Mode Power Supplies (SMPS), including failed switching transistors, PWM ICs, optocouplers, and other power-related components.", "k": "power supply, smps, pwm ic, optocoupler"},
    {"q": "My amplifier has no power. Can you fix it?", "a": "Yes. No-power conditions are commonly caused by faults in the power supply section. Our technicians perform detailed component-level diagnostics to identify and repair the root cause.", "k": "no power, won't turn on, fix power issue"},
    
    # 7. Digital & DSP PCB Restoration
    {"q": "Do you repair HDMI boards?", "a": "Yes. We repair HDMI and DSP boards found in AV receivers and audio processors.", "k": "hdmi board, dsp repair, av receiver hdmi"},
    {"q": "Can lost audio channels be repaired?", "a": "Yes. Lost channels may be caused by failed DSP components or solder-joint issues. We perform advanced diagnostics and BGA rework when necessary.", "k": "lost channels, no audio channel, dsp components"},
    
    # 8. Speaker & Crossover Electronics
    {"q": "Do speakers contain circuit boards?", "a": "Yes. Passive speakers contain crossover networks, while active speakers include amplifier and electronic control circuits.", "k": "speaker circuit board, passive crossover, active speaker"},
    {"q": "Can damaged speaker crossovers be repaired?", "a": "Yes. We diagnose and repair crossover PCBs and internal speaker electronics.", "k": "crossover repair, speaker electronics, damaged crossover"},
    
    # 9. Amplification & Output Stage Repair
    {"q": "What causes an amplifier to go into protect mode?", "a": "Protect mode is often caused by failed output transistors, DC offset faults, or other output stage issues.", "k": "protect mode, output transistors, dc offset, red light"},
    {"q": "Can blown output transistors be repaired?", "a": "Yes. We perform component-level repairs and replace faulty output devices while ensuring proper matching and performance.", "k": "blown transistors, output devices, repair transistor"},
    
    # 10. Architectural Audio
    {"q": "Do you provide residential audio installations?", "a": "Yes. AHA Technologies designs and installs premium audio systems for homes, media rooms, and dedicated home theatres.", "k": "residential audio, home installations, media room"},
    {"q": "Do you work on commercial audio projects?", "a": "Yes. We provide architectural audio solutions for both residential and large-scale commercial environments.", "k": "commercial audio, architectural audio, large-scale"},
    
    # 11. Dedicated Home Cinemas
    {"q": "Can you design a dedicated home cinema?", "a": "Yes. We provide complete home cinema solutions including speaker layout, AV receivers, Dolby Atmos systems, acoustic treatment, and calibration.", "k": "dedicated home cinema, speaker layout, acoustic treatment"},
    {"q": "Do you perform acoustic calibration?", "a": "Yes. Precision acoustic calibration is an essential part of our installation process to ensure balanced and immersive sound.", "k": "acoustic calibration, balance sound, room calibration"},
    
    # 12. Corporate & UC Environments
    {"q": "Do you install conference room audio systems?", "a": "Yes. We provide audio solutions for corporate and unified communication environments using advanced microphone arrays and optimized room acoustics.", "k": "conference room, corporate audio, microphone array"},
    {"q": "Can background noise be reduced during meetings?", "a": "Yes. Our systems are designed to minimize HVAC noise and room reverberation for improved speech clarity.", "k": "background noise, hvac noise, speech clarity"},
    
    # 13. Distributed Audio & Audio over IP
    {"q": "What is distributed audio?", "a": "Distributed audio allows sound to be delivered across multiple rooms or large areas using centralized equipment.", "k": "distributed audio, multi-room, large areas"},
    {"q": "Do you support Audio over IP (AoIP)?", "a": "Yes. We integrate modern Audio over IP solutions and 70V/100V constant-voltage systems for large installations.", "k": "audio over ip, aoip, 70v, 100v"},
    
    # 14. Industrial QA & Bench Testing
    {"q": "Do you perform equipment testing?", "a": "Yes. We conduct thermal checks, impedance sweeps, and bench testing to verify performance and reliability.", "k": "equipment testing, bench test, thermal check"},
    {"q": "What is an impedance sweep?", "a": "An impedance sweep measures speaker characteristics and helps identify deteriorating voice coils before failures occur.", "k": "impedance sweep, voice coil, measure speaker"},
    
    # 15. Preventive Maintenance
    {"q": "Do you offer preventive maintenance services?", "a": "Yes. Preventive maintenance helps extend equipment life and reduce the risk of unexpected failures.", "k": "preventive maintenance, extend life, reduce failure"},
    {"q": "What does preventive maintenance include?", "a": "Services include: Thermal deep cleaning, Heat sink and fan cleaning, Impedance sweeps, Performance verification, and General inspection.", "k": "what involves, maintenance include, thermal cleaning, fan cleaning"},
    {"q": "Why is preventive maintenance important?", "a": "Scheduled maintenance improves reliability, prolongs equipment life, and helps prevent costly breakdowns.", "k": "why maintenance, prevent breakdown, reliability"},
    
    # General / Other
    {"q": "Which brands do you work with?", "a": "We work with many premium audio brands including Denon, Marantz, Yamaha, Sony, Polk Audio, Klipsch, KEF, and other leading manufacturers.", "k": "brands, denon, marantz, yamaha, klipsch, kef"}
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
