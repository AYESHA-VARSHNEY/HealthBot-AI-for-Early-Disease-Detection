import React, { createContext, useContext, useState } from "react";

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [days, setDays] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  return (
    <HealthContext.Provider
      value={{
        selectedSymptoms,
        setSelectedSymptoms,
        days,
        setDays,
        recommendation,
        setRecommendation,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealthContext = () => useContext(HealthContext);
