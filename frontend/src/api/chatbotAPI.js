import axios from "axios";

export const getRecommendation = async (symptoms) => {
  try {
    // Simulate API call for demo purposes
    // In production, replace with actual backend endpoint
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response based on symptoms
    const mockResponse = {
      disease: symptoms.includes('fever') && symptoms.includes('cough') ? 
        "Common Cold" : symptoms.includes('headache') && symptoms.includes('fatigue') ?
        "Tension Headache" : "General Symptoms",
      description: symptoms.includes('fever') && symptoms.includes('cough') ?
        "A viral infection affecting the upper respiratory tract. Common symptoms include fever, cough, and fatigue." :
        symptoms.includes('headache') && symptoms.includes('fatigue') ?
        "Tension headaches are often caused by stress, poor posture, or lack of sleep." :
        "Based on your symptoms, it's recommended to consult with a healthcare professional for proper evaluation.",
      precautions: symptoms.includes('fever') && symptoms.includes('cough') ?
        ["Get plenty of rest", "Stay hydrated", "Take over-the-counter pain relievers as needed", "Consult a doctor if symptoms worsen"] :
        symptoms.includes('headache') && symptoms.includes('fatigue') ?
        ["Apply a cold or warm compress", "Practice relaxation techniques", "Maintain regular sleep schedule", "Stay hydrated"] :
        ["Monitor your symptoms", "Rest adequately", "Maintain good hygiene", "Seek medical attention if concerned"]
    };
    
    return mockResponse;
    
    // Uncomment below for actual API integration
    // const response = await axios.post("http://localhost:5000/predict", {
    //   symptoms,
    // });
    // return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to get recommendation. Please try again.");
  }
};