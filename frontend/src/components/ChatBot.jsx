import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import SymptomSelector from './SymptomSelector';
import RecommendationBox from './RecommendationBox';
import { getRecommendation } from '../api/chatbotAPI';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your healthcare assistant. Please select your symptoms from the list below, and I'll provide you with potential health insights and recommendations.", 
      isBot: true 
    }
  ]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatSymptomName = (symptom) => {
    return symptom.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) return;

    setHasSubmitted(true);
    setIsLoading(true);

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: `I'm experiencing: ${selectedSymptoms.map(formatSymptomName).join(', ')}`,
      isBot: false
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const result = await getRecommendation(selectedSymptoms);
      
      setIsLoading(false);
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: "Based on your symptoms, I've prepared a health assessment for you. Please review the recommendations below.",
        isBot: true
      };
      
      setMessages(prev => [...prev, botMessage]);
      setRecommendation(result);
      
    } catch (error) {
      setIsLoading(false);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble processing your request right now. Please try again later or consult with a healthcare professional.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleNewConsultation = () => {
    setMessages([
      { 
        id: 1, 
        text: "I'm ready to help you with a new health consultation. Please select your current symptoms.", 
        isBot: true 
      }
    ]);
    setSelectedSymptoms([]);
    setRecommendation(null);
    setHasSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Chat Messages */}
      <div className="bg-slate-900 rounded-xl p-6 min-h-96 max-h-96 overflow-y-auto border border-slate-700 shadow-lg">
        <div className="space-y-1">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message.text} 
              isBot={message.isBot} 
            />
          ))}
          {isLoading && <MessageBubble isBot={true} isLoading={true} />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Symptom Selector */}
      {!hasSubmitted && (
        <SymptomSelector
          selectedSymptoms={selectedSymptoms}
          onSymptomsChange={setSelectedSymptoms}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}

      {/* Recommendation Box */}
      {recommendation && (
        <div className="space-y-4">
          <RecommendationBox recommendation={recommendation} />
          <button
            onClick={handleNewConsultation}
            className="w-full px-6 py-3 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium border border-slate-600"
          >
            Start New Consultation
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;