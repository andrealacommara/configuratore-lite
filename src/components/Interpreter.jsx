import React, { useState } from "react";

export default function Interpreter({ config }) {
  const [errors, setErrors] = useState(null);

  const runInterpreter = async () => {
    setErrors(null);
    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors);
        return;
      }
      // scarica ciascun file restituito
      Object.entries(data).forEach(([name, content]) => {
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
      });
    } catch (err) {
      setErrors([{ message: err.message }]);
    }
  };

  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <button onClick={runInterpreter} className="export" disabled={!config}>
        Genera frammenti Yocto
      </button>
      {errors && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <strong>Errori:</strong>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
