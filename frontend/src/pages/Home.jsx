import React from "react";
import { useNavigate } from "react-router-dom";
c;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-100">HealthBot AI</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get instant health insights powered by AI. Select your symptoms and
            receive personalized recommendations from our intelligent healthcare
            assistant.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Shield size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              AI-Powered Analysis
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Advanced machine learning algorithms analyze your symptoms to
              provide accurate health insights and recommendations.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Clock size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Instant Results
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Get immediate health assessments and precautionary measures
              without waiting for appointments or long queues.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Professional Guidance
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Receive healthcare recommendations based on medical knowledge
              while being guided to seek professional care when needed.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">
            Ready to Start Your Health Assessment?
          </h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">
            Our AI assistant will guide you through a simple symptom selection
            process and provide personalized health insights.
          </p>
          <button
            onClick={() => navigate("/chat")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Start Health Diagnosis
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 max-w-3xl mx-auto">
            <p className="text-amber-200 text-sm">
              <strong>Medical Disclaimer:</strong> This AI assistant provides
              general health information and should not be used as a substitute
              for professional medical advice, diagnosis, or treatment. Always
              consult with qualified healthcare providers for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
