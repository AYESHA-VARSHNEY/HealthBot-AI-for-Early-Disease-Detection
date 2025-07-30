import React from "react";
import AppRoutes from "./routes.jsx";
import { HealthProvider } from "./context/HealthContext.jsx";
function App() {
  return (
    <HealthProvider>
      <AppRoutes />
    </HealthProvider>
  );
}

export default App;
