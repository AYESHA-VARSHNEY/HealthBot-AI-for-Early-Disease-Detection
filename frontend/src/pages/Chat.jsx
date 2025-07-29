import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';
import ChatBot from '../components/ChatBot';

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold text-slate-100">HealthBot AI Assistant</h1>
          </div>
          
          <div className="w-24"></div> {/* Spacer for center alignment */}
        </div>

        {/* ChatBot Component */}
        <ChatBot />
      </div>
    </div>
  );
};

export default Chat;