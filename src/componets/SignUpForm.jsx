
import React, { useState } from 'react';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.token) {
        setToken(result.token); 
      } else {
        setError("Failed to sign up or get token!");
      }
    } catch (err) {
      setError("An error occurred: " + err.message);
    }
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

