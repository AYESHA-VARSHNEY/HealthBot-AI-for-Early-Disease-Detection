import React, { useState } from "react";
import { symptomsList } from "../data/symptomsList";
import { ChevronDown, X, Plus } from "lucide-react";
import { useHealthContext } from "../context/HealthContext";

const SymptomSelector = ({ onSubmit, isLoading }) => {
  const { selectedSymptoms, setSelectedSymptoms, days, setDays } =
    useHealthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSymptoms = symptomsList.filter(
    (symptom) =>
      symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSymptoms.includes(symptom)
  );

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const formatSymptomName = (symptom) => {
    return symptom.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };
  const handleSubmit = () => {
    if (!days || isNaN(days) || parseInt(days) <= 0) {
      alert("Please enter a valid number of days.");
      return;
    }
    onSubmit();
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Select Your Symptoms
      </h3>

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-slate-300 mb-2">Selected symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom) => (
              <span
                key={symptom}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
              >
                {formatSymptomName(symptom)}
                <button
                  onClick={() => removeSymptom(symptom)}
                  className="hover:bg-blue-700 rounded-full p-1 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Plus size={16} />
            Add symptoms
          </span>
          <ChevronDown
            size={16}
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 border border-slate-600 rounded-lg shadow-xl z-10 max-h-64 overflow-hidden">
            <div className="p-3 border-b border-slate-600">
              <input
                type="text"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredSymptoms.length > 0 ? (
                filteredSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => {
                      toggleSymptom(symptom);
                      setSearchTerm("");
                    }}
                    className="w-full text-left px-4 py-2 text-slate-100 hover:bg-slate-600 focus:outline-none focus:bg-slate-600 transition-colors"
                  >
                    {formatSymptomName(symptom)}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2 text-slate-400 text-sm">
                  No symptoms found
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Days Input */}
      {selectedSymptoms.length > 0 && (
        <div className="mt-4">
          <label
            htmlFor="days"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            How many days have you experienced these symptoms?
          </label>
          <input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            min={1}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter number of days"
          />
        </div>
      )}

      {/* Submit Button */}
      {selectedSymptoms.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Analyzing..." : "Get Health Recommendations"}
        </button>
      )}
    </div>
  );
};

export default SymptomSelector;
