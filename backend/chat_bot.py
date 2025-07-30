import re
import pandas as pd
import numpy as np
import joblib
import csv
import os
from sklearn.tree import _tree
import warnings

import sys
import os

# Suppress sklearn warnings cleanly
if not sys.warnoptions:
    warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

warnings.filterwarnings("ignore", category=DeprecationWarning)

class HealthcareChatbot:
    def __init__(self):
        """Initialize the chatbot with trained models and data."""
        self.model = None
        self.label_encoder = None
        self.feature_names = None
        self.severity_dict = {}
        self.description_dict = {}
        self.precaution_dict = {}
        self.symptoms_dict = {}
        self.reduced_data = None

        # Load models and data
        self.load_models()
        self.load_support_data()

    def load_models(self):
        """Load the trained model and encoders."""
        try:
            # Check for the best model files
            model_files = [f for f in os.listdir('models/') if f.startswith('best_model_') and f.endswith('.pkl')]
            if model_files:
                model_path = f'models/{model_files[0]}'
                self.model = joblib.load(model_path)
                print(f"Loaded model: {model_path}")
            else:
                raise FileNotFoundError("No trained model found. Please run model_training.ipynb first.")

            self.label_encoder = joblib.load('models/label_encoder.pkl')
            self.feature_names = joblib.load('models/feature_names.pkl')

            # Load training data for reduced_data
            training = pd.read_csv('Data/Training.csv')
            self.reduced_data = training.groupby(training['prognosis']).max()

            print("Models and data loaded successfully!")

        except Exception as e:
            print(f"Error loading models: {e}")
            print("Please ensure you have run the model training notebook first.")
            exit(1)

    def load_support_data(self):
        """Load symptom descriptions, severity, and precautions."""
        # Load symptom descriptions
        try:
            with open('MasterData/symptom_Description.csv') as f:
                csv_reader = csv.reader(f, delimiter=',')
                for row in csv_reader:
                    if len(row) >= 2:
                        self.description_dict[row[0]] = row[1]
        except FileNotFoundError:
            print("Warning: symptom_Description.csv not found")

        # Load symptom severity
        try:
            with open('MasterData/symptom_severity.csv') as f:
                csv_reader = csv.reader(f, delimiter=',')
                for row in csv_reader:
                    if len(row) >= 2:
                        try:
                            self.severity_dict[row[0]] = int(row[1])
                        except ValueError:
                            pass
        except FileNotFoundError:
            print("Warning: symptom_severity.csv not found")

        # Load precautions
        try:
            with open('MasterData/symptom_precaution.csv') as f:
                csv_reader = csv.reader(f, delimiter=',')
                for row in csv_reader:
                    if len(row) >= 5:
                        self.precaution_dict[row[0]] = [row[1], row[2], row[3], row[4]]
        except FileNotFoundError:
            print("Warning: symptom_precaution.csv not found")

        # Create symptoms dictionary
        for index, symptom in enumerate(self.feature_names):
            self.symptoms_dict[symptom] = index

    # def check_symptom_pattern(self, symptom_list, user_input):
    #     """Check if user input matches any symptoms."""
    #     pred_list = []
    #     user_input = user_input.replace(' ', '_').lower()

    #     # Create regex pattern
    #     pattern = re.compile(user_input, re.IGNORECASE)
    #     pred_list = [symptom for symptom in symptom_list if pattern.search(symptom.lower())]

    #     if len(pred_list) > 0:
    #         return True, pred_list
    #     else:
    #         return False, []

    def predict_disease(self, symptoms_list):
        """Predict disease based on symptoms."""
        # Create input vector
        input_vector = np.zeros(len(self.feature_names))
        for symptom in symptoms_list:
            if symptom in self.symptoms_dict:
                input_vector[self.symptoms_dict[symptom]] = 1

        # Make prediction
        prediction = self.model.predict([input_vector])
        disease_name = self.label_encoder.inverse_transform(prediction)[0]

        # Get prediction confidence if available
        confidence = None
        if hasattr(self.model, 'predict_proba'):
            proba = self.model.predict_proba([input_vector])
            confidence = np.max(proba)

        return disease_name, confidence

    def calculate_condition_severity(self, symptoms, days):
        """Calculate condition severity based on symptoms and duration."""
        total_severity = 0
        for symptom in symptoms:
            if symptom in self.severity_dict:
                total_severity += self.severity_dict[symptom]

        if len(symptoms) == 0:
            return "Unable to assess severity."

        severity_score = (total_severity * days) / (len(symptoms) + 1)

        if severity_score > 13:
            return "You should take the consultation from a doctor."
        else:
            return "It might not be that bad but you should take precautions."

    # def get_symptom_input(self):
    #     """Get initial symptom from user with pattern matching."""
    #     symptom_list = self.feature_names

    #     while True:
    #         print("\nEnter the symptom you are experiencing", end=" -> ")
    #         disease_input = input("").strip()

    #         if not disease_input:
    #             print("Please enter a symptom.")
    #             continue

    #         found, matched_symptoms = self.check_symptom_pattern(symptom_list, disease_input)

    #         if found:
    #             if len(matched_symptoms) == 1:
    #                 return matched_symptoms[0]
    #             else:
    #                 print("\nFound multiple matches:")
    #                 for num, symptom in enumerate(matched_symptoms):
    #                     print(f"{num}) {symptom}")

    #                 while True:
    #                     try:
    #                         choice = int(input(f"Select the one you meant (0 - {len(matched_symptoms)-1}): "))
    #                         if 0 <= choice < len(matched_symptoms):
    #                             return matched_symptoms[choice]
    #                         else:
    #                             print("Please enter a valid choice.")
    #                     except ValueError:
    #                         print("Please enter a valid number.")
    #         else:
    #             print("Symptom not found. Please try a different symptom or check spelling.")
    #             print("Example symptoms: fever, cough, headache, nausea, etc.")

    # def get_duration(self):
    #     """Get symptom duration from user."""
    #     while True:
    #         try:
    #             duration = int(input("For how many days have you been experiencing this? "))
    #             if duration > 0:
    #                 return duration
    #             else:
    #                 print("Please enter a positive number.")
    #         except ValueError:
    #             print("Please enter a valid number of days.")

    def get_additional_symptoms(self, primary_symptom, predicted_disease):
        """Get additional symptoms based on the predicted disease."""
        print(f"\nBased on '{primary_symptom}', you might have {predicted_disease}")
        print("\nLet me ask about some related symptoms...")

        # Get symptoms associated with this disease from training data
        if predicted_disease in self.reduced_data.index:
            disease_symptoms = self.reduced_data.loc[predicted_disease]
            related_symptoms = [col for col in disease_symptoms.index 
                              if disease_symptoms[col] == 1 and col != primary_symptom]
        else:
            related_symptoms = []

        confirmed_symptoms = [primary_symptom]

        # Ask about related symptoms
        for symptom in related_symptoms[:10]:  # Limit to 10 questions
            while True:
                response = input(f"Are you experiencing {symptom.replace('_', ' ')}? (yes/no): ").lower().strip()
                if response in ['yes', 'y']:
                    confirmed_symptoms.append(symptom)
                    break
                elif response in ['no', 'n']:
                    break
                else:
                    print("Please answer with 'yes' or 'no'")

        return confirmed_symptoms

    # def run_diagnosis(self):
    #     """Run the main diagnosis process."""
    #     print("=" * 70)
    #     print("                   HEALTHCARE CHATBOT")
    #     print("=" * 70)
    #     print("\nWelcome! I'll help you identify potential health conditions.")
    #     print("Please note: This is for informational purposes only.")
    #     print("Always consult a healthcare professional for proper diagnosis.")

    #     # Get user's name
    #     name = input("\nWhat's your name? ").strip()
    #     if name:
    #         print(f"\nHello {name}! Let's begin the diagnosis.")

    #     try:
    #         # Get primary symptom
    #         primary_symptom = self.get_symptom_input()

    #         # Make initial prediction
    #         initial_disease, confidence = self.predict_disease([primary_symptom])

    #         # Get symptom duration
    #         duration = self.get_duration()

    #         # Get additional symptoms
    #         all_symptoms = self.get_additional_symptoms(primary_symptom, initial_disease)

    #         # Final prediction with all symptoms
    #         final_disease, final_confidence = self.predict_disease(all_symptoms)

    #         # Calculate severity
    #         severity_advice = self.calculate_condition_severity(all_symptoms, duration)

    #         # Display results
    #         print("\n" + "="*50)
    #         print("DIAGNOSIS RESULTS")
    #         print("="*50)

    #         print(f"\nBased on your symptoms, you may have: {final_disease}")

    #         if final_confidence:
    #             print(f"Confidence: {final_confidence:.1%}")

    #         # Show description if available
    #         if final_disease in self.description_dict:
    #             print(f"\nDescription: {self.description_dict[final_disease]}")

    #         # Show severity assessment
    #         print(f"\nSeverity Assessment: {severity_advice}")

    #         # Show precautions if available
    #         if final_disease in self.precaution_dict:
    #             print("\nRecommended precautions:")
    #             for i, precaution in enumerate(self.precaution_dict[final_disease], 1):
    #                 if precaution.strip():  # Only show non-empty precautions
    #                     print(f"{i}) {precaution}")

    #         # Show symptoms considered
    #         print(f"\nSymptoms considered: {', '.join([s.replace('_', ' ') for s in all_symptoms])}")

    #     except KeyboardInterrupt:
    #         print("\n\nDiagnosis interrupted. Take care!")
    #     except Exception as e:
    #         print(f"\nAn error occurred: {e}")
    #         print("Please try again or consult a healthcare professional.")

    #     print("\n" + "="*70)
    #     print("Thank you for using Healthcare Chatbot!")
    #     print("Remember: Always consult a qualified doctor for proper medical advice.")
    #     print("="*70)

def main():
    """Main function to run the chatbot."""
    try:
        chatbot = HealthcareChatbot()
        chatbot.run_diagnosis()
    except Exception as e:
        print(f"Failed to start chatbot: {e}")
        print("Please ensure all required files are present and the model has been trained.")

if __name__ == "__main__":
    main()
