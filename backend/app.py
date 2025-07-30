from flask import Flask, request, jsonify
from flask_cors import CORS
from chat_bot import HealthcareChatbot  

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Allow cross-origin requests

# Initialize the chatbot
chatbot = HealthcareChatbot()

    

@app.route('/predict', methods=['POST'])
def predict_disease():
    """
    Input JSON format:
    {
        "symptoms": ["fever", "headache", "cough"],
        "duration": 4
    }
    """
    data = request.get_json()
    symptoms = data.get("symptoms", [])
    duration = int(data.get("duration", 1))

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    # Predict disease
    disease_name, confidence = chatbot.predict_disease(symptoms)
    
    # Calculate severity
    severity_msg = chatbot.calculate_condition_severity(symptoms, duration)

    # Get precautions
    precautions = chatbot.precaution_dict.get(disease_name, [])
    
    # Show description if available
    description=None
    if disease_name in chatbot.description_dict:
        description= chatbot.description_dict[disease_name]

    return jsonify({
        "disease": disease_name,
        "confidence": float(confidence) if confidence is not None else None,
        "severity": severity_msg,
        "precautions": precautions, 
        "description": description if description is not None else None
    })

# @app.route('/match-symptom', methods=['GET'])
# def match_symptom():
#     user_input = request.args.get("input", "")
#     if not user_input:
#         return jsonify({"error": "No input provided"}), 400

#     found, matched = chatbot.check_symptom_pattern(chatbot.feature_names, user_input)
#     return jsonify({
#         "found": found,
#         "matches": matched
#     })



if __name__ == '__main__':
    app.run(debug=True, port=3000)
