import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai

app = Flask(__name__)
# Frontend එකෙන් එන ඕනෑම request එකකට ඉඩ දීම
CORS(app, resources={"/api/*": {"origins": "*"}})

# ඔබගේ Gemini API Key එක මෙතැනට යොදන්න
GEMINI_API_KEY = "AQ.Ab8RN6Jqj6A_2fySnlGl-hu1IZ-pZrJahqmI_WtOvv928WWYMg"

client = None
if GEMINI_API_KEY != "YOUR_GEMINI_API_KEY_HERE":
    client = genai.Client(api_key=GEMINI_API_KEY)

@app.route('/api/ask', methods=['POST'])
def ask_ai():
    try:
        if not client:
            return jsonify({'error': 'AQ.Ab8RN6Jqj6A_2fySnlGl-hu1IZ-pZrJahqmI_WtOvv928WWYMg'}), 400

        data = request.get_json()
        user_prompt = data.get('prompt','Web Development කියන්නේ මොකක්ද?')

        if not user_prompt:
            return jsonify({'error': ''}), 400

        # Gemini Model එක කැඳවීම
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=user_prompt,
        )

        return jsonify({
            'status': 'success',
            'answer': response.text
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)