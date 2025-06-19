// src/components/DisasterList.jsx
import React, { useEffect, useState } from 'react';

export default function DisasterList() {
  const [disasters, setDisasters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [socialFeed, setSocialFeed] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [resourceResults, setResourceResults] = useState(null);
  const [location, setLocation] = useState({ lat: '', lon: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/disasters')
      .then((res) => res.json())
      .then(setDisasters);
  }, []);

  const fetchSocial = async (id) => {
    const res = await fetch(`http://localhost:5000/api/disasters/${id}/social-media`);
    const data = await res.json();
    setSelected(id);
    setSocialFeed(data);
  };

  const verifyImage = async () => {
    const res = await fetch(`http://localhost:5000/api/disasters/${selected}/verify-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrl })
    });
    const data = await res.json();
    setVerifyResult(data);
  };

  const fetchResources = async () => {
    const res = await fetch(
      `http://localhost:5000/api/disasters/${selected}/resources?lat=${location.lat}&lon=${location.lon}`
    );
    const data = await res.json();
    setResourceResults(data);
  };

  return (
    <div>
      <h2>🌍 All Disasters</h2>
      {disasters.map((d) => (
        <div key={d.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <strong>{d.title}</strong>
          <p>{d.description}</p>
          <p><em>{d.location_name}</em></p>
         <p>Tags: {(Array.isArray(d.tags) ? d.tags : JSON.parse(d.tags)).join(', ')}</p>

          <button onClick={() => fetchSocial(d.id)}>View Social Feed</button>
          <button onClick={() => setSelected(d.id)}>Actions</button>
        </div>
      ))}

      {selected && (
        <div style={{ padding: '1rem', border: '1px dashed #666', marginTop: '1rem' }}>
          <h3>Actions for Disaster ID: {selected}</h3>

          <h4>📡 Social Media Feed</h4>
          <pre>{JSON.stringify(socialFeed, null, 2)}</pre>

          <h4>🧭 Resource Lookup (Geo)</h4>
          <input
            placeholder="Latitude"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
          />
          <input
            placeholder="Longitude"
            value={location.lon}
            onChange={(e) => setLocation({ ...location, lon: e.target.value })}
          />
          <button onClick={fetchResources}>Find Nearby Resources</button>
          {resourceResults && <pre>{JSON.stringify(resourceResults, null, 2)}</pre>}

          <h4>🖼️ Image Verification</h4>
          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button onClick={verifyImage}>Verify Image</button>
          {verifyResult && <pre>{JSON.stringify(verifyResult, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}
