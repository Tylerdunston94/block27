
import React, { useState } from 'react';

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleClick() {
    console.log('Authenticate button clicked!');

    if (!token) {
      setError("No token available. Please sign up first.");
      return;
    }

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(result.message); 
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred: " + err.message);
    }
  }

  return (
    <>
      <h2>Authenticate!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}
