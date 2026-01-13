import React, { useState } from "react";
import TimetableForm from "./components/TimetableForm";
import TimetableResult from "./components/TimetableResult";

function App() {
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Backend error");
      
      const data = await response.json();
      setScheduleData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to Python backend. Ensure it is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {!scheduleData ? (
        <TimetableForm onSubmit={handleGenerate} loading={loading} />
      ) : (
        <TimetableResult data={scheduleData} onBack={() => setScheduleData(null)} />
      )}
    </div>
  );
}

export default App;