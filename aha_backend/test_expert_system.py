import os
import sys
import django
import json

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aha_backend.settings')
django.setup()

from chatbot_api.views import get_heuristic_reply

# Fake Redis session wrapper for local testing without web server
class MockSession:
    def __init__(self):
        self.state_data = {}
        self.session_id = "mock"
        self.current_intent = ""
    def save(self):
        pass
    def get(self, key):
        # Allow older direct calls mapped to state_data if used
        return self.state_data.get(key)
    def set(self, key, value):
        self.state_data[key] = value

print("\n=======================================================")
print("  AHA Expert System v2 - NLP Benchmark & Regression Suite  ")
print("=======================================================\n")

TEST_CASES = [
    # 1. Basic FAQ Tests (Should route to KB/Gemini or short answers, not domain flows)
    {"q": "What is Dolby Atmos?", "expected_domain": None},
    {"q": "What is a 5.1.2 system?", "expected_domain": None},
    
    # 2. Synonym Tests -> PROTECT_MODE
    {"q": "My AVR shuts down after a few seconds.", "expected_domain": "PROTECT_MODE"},
    {"q": "Receiver keeps turning itself off.", "expected_domain": "PROTECT_MODE"},
    {"q": "Display shows protect.", "expected_domain": "PROTECT_MODE"},
    {"q": "Amp enters safety mode.", "expected_domain": "PROTECT_MODE"},
    {"q": "My amplifier goes into protection.", "expected_domain": "PROTECT_MODE"},

    # 3. Entity Extraction
    {"q": "My Denon AVR-X3700H has no power.", "expected_domain": "NO_POWER", "expected_brand": "Denon", "expected_model": "AVR-X3700H"},
    {"q": "My Yamaha RX-V685 HDMI output stopped working.", "expected_domain": "HDMI_REPAIR", "expected_brand": "Yamaha", "expected_model": "RX-V685"},

    # 5. Lost Channel Tests
    {"q": "My center speaker stopped working.", "expected_domain": "DSP_REPAIR"},
    {"q": "Rear left channel has no sound.", "expected_domain": "DSP_REPAIR"},
    {"q": "Only surround speakers are silent.", "expected_domain": "DSP_REPAIR"},
    
    # 6. HDMI Tests
    {"q": "No picture on TV.", "expected_domain": "HDMI_REPAIR"},
    {"q": "ARC stopped working.", "expected_domain": "HDMI_REPAIR"},
    {"q": "Receiver outputs audio but no video.", "expected_domain": "HDMI_REPAIR"},

    # 7. Distortion Tests
    {"q": "Audio crackles at high volume.", "expected_domain": "DISTORTED_SOUND"},
    {"q": "Left speaker sounds distorted.", "expected_domain": "DISTORTED_SOUND"},
    
    # 9. Home Theatre Design
    {"q": "Room is 12 x 15 feet. Budget is 3 lakh. Need Dolby Atmos.", "expected_domain": "HOME_THEATRE"},

    # 10. Calibration
    {"q": "Need Audyssey calibration.", "expected_domain": "CALIBRATION"},
    {"q": "Need Dirac Live setup.", "expected_domain": "CALIBRATION"},
    
    # 17. Long Natural Language Tests
    {"q": "I have a Denon AVR-X3700H connected to a KEF 5.1 system. Everything was fine until last week, but now the receiver shuts down after around 10 minutes and sometimes shows protect on the display.", "expected_domain": "PROTECT_MODE", "expected_brand": "Denon", "expected_model": "AVR-X3700H"},
]

def run_tests():
    passed = 0
    failed = 0

    for idx, test in enumerate(TEST_CASES):
        print(f"Test {idx+1}: '{test['q']}'")
        session = MockSession()
        session.set('session_id', f'test_session_{idx}')
        
        reply = get_heuristic_reply(session, test['q'])
        current_focus = session.current_intent
        extracted_fields = session.state_data or {}
        
        # Validate Domain Mapping
        exp_domain = test.get('expected_domain')
        if exp_domain:
            if current_focus == exp_domain:
                # Need to check expected entities
                exp_brand = test.get('expected_brand')
                exp_model = test.get('expected_model')
                err = []
                if exp_brand and extracted_fields.get('brand', '').lower() != exp_brand.lower():
                    err.append(f"Expected brand {exp_brand}, got {extracted_fields.get('brand', 'None')}")
                # We do partial checking for model
                if exp_model and exp_model.lower() not in extracted_fields.get('model', '').lower():
                    err.append(f"Expected model {exp_model}, got {extracted_fields.get('model', 'None')}")
                    
                if not err:
                    print("  [✓] PASSED")
                    passed += 1
                else:
                    print(f"  [X] FAILED - Entities mismatch: {', '.join(err)}")
                    failed += 1
            else:
                print(f"  [X] FAILED - Expected domain '{exp_domain}', but got '{current_focus}'")
                failed += 1
        else:
            # Expected None (FAQ hit)
            if not current_focus:
                print("  [✓] PASSED (Recognized as FAQ/General)")
                passed += 1
            else:
                print(f"  [X] FAILED - Expected FAQ routing, but entered domain '{current_focus}'")
                failed += 1

    print("\n=======================================================")
    print("  Benchmark Context Switching Test")
    print("=======================================================\n")
    
    # Multi-turn Context Switching test
    session = MockSession()
    session.set('session_id', 'multi_turn_test')
    
    print("User: My Yamaha RX-V685 has HDMI issues.")
    get_heuristic_reply(session, "My Yamaha RX-V685 has HDMI issues.")
    print(f"  -> State: Intent={session.current_intent}")
    if session.current_intent != "HDMI_REPAIR":
        print("  [X] Context Test FAILED (Did not hit HDMI_REPAIR)")
        failed += 1
    else:
        passed += 1
        
    print("User: Actually my Denon X3800H has no power.")
    get_heuristic_reply(session, "Actually my Denon X3800H has no power.")
    print(f"  -> State: Intent={session.current_intent}")
    if session.current_intent == "NO_POWER" and session.state_data.get('brand', '').lower() == "denon":
        print("  [✓] Context Test PASSED (Successfully aborted HDMI_REPAIR and switched to NO_POWER)")
        passed += 1
    else:
        print("  [X] Context Test FAILED (Did not switch appropriately)")
        failed += 1

    print("\n-------------------------------------------------------")
    print(f"  RESULTS: {passed} PASSED, {failed} FAILED")
    print("-------------------------------------------------------\n")

if __name__ == "__main__":
    run_tests()
