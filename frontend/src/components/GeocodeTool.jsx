// src/components/GeocodeTool.jsx
import React, { useState } from 'react';

export default function GeocodeTool() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);

  const handleGeocode = async () => {
    const res = await fetch('http://localhost:5000/api/geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>🗺️ Geocode from Description</h2>
      <textarea
        rows="3"
        placeholder="e.g., Flooding in Mumbai near the river bank"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%' }}
      /><br />
      <button onClick={handleGeocode}>Geocode</button>

      {result && (
        <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
