import React, { useState } from "react";
import BASE_API_URL from "../api";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch(`${BASE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Login fallito");
        return;
      }

      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
    } catch (err) {
      setError("Errore di connessione");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 mt-10 text-center">
      <h2 className="text-lg font-bold mb-4">Accedi</h2>
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 w-full"
      >
        Login
      </button>
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
