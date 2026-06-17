import requests
KEY_VISUAL = "YOUR_GEMINI_VISUAL_API_KEY"
VISUAL_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
payload = {
    "contents": [{"parts": [
        {"text": "You are a Master Audio Technician. Inspect this image and briefly describe visible faults."},
        {"inlineData": {"mimeType": "image/png", "data": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="}}
    ]}],
    "generationConfig": {"temperature": 0.05, "maxOutputTokens": 200}
}
resp = requests.post(f"{VISUAL_URL}?key={KEY_VISUAL}", json=payload)
print("Status:", resp.status_code)
data = resp.json()
if resp.status_code == 200:
    print("SUCCESS:", data["candidates"][0]["content"]["parts"][0]["text"])
else:
    print("ERROR:", data.get("error", {}).get("message", "unknown"))
