import React from "react";
import { AlertCircle, Shield, CheckCircle2 } from "lucide-react";

const RecommendationBox = ({ recommendation }) => {
  if (!recommendation) return null;
  var description = recommendation.description;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg animate-fadeIn">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
          <AlertCircle size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-100 mb-1">
            Potential Condition
          </h3>
          <p className="text-red-400 font-medium text-lg">
            {recommendation.disease}
          </p>
        </div>
      </div>

      {description && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wide mb-2">
            Description
          </h4>
          <p className="text-slate-100 leading-relaxed">{description}</p>
        </div>
      )}

      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wide mb-2">
          Severity
        </h4>
        <p className="text-slate-100 leading-relaxed">
          {recommendation.severity}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} className="text-green-400" />
          <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wide">
            Recommended Precautions
          </h4>
        </div>
        <ul className="space-y-2">
          {recommendation.precautions.map((precaution, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2
                size={16}
                className="text-green-400 mt-0.5 flex-shrink-0"
              />
              <span className="text-slate-100 text-sm leading-relaxed">
                {precaution}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg">
        <p className="text-amber-200 text-sm">
          <strong>Disclaimer:</strong> This is an AI-powered assessment and
          should not replace professional medical advice. Please consult with a
          qualified healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
};

export default RecommendationBox;
