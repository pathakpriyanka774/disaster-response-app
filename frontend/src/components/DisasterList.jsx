// src/components/DisasterList.jsx
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function DisasterList() {
  const [disasters, setDisasters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [socialFeed, setSocialFeed] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [resourceResults, setResourceResults] = useState(null);
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/disasters')
      .then((res) => res.json())
      .then(setDisasters);
  }, []);

  useEffect(() => {
    if (resourceResults && resourceResults.length > 0 && location.lat && location.lon) {
      if (!map) {
        const newMap = L.map('map').setView([location.lat, location.lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(newMap);
        setMap(newMap);

        // add center marker for disaster
        L.marker([location.lat, location.lon]).addTo(newMap).bindPopup('Disaster Location').openPopup();

        // add hospital markers
        resourceResults.forEach(h => {
          L.marker([h.lat, h.lon]).addTo(newMap).bindPopup(h.name);
        });
      }
    }
  }, [resourceResults]);

  const fetchSocial = async (id) => {
    const res = await fetch(`http://localhost:5000/api/disasters/${id}/social-media`);
    const data = await res.json();
    setSelected(id);
    setSocialFeed(data);
  };

  const classifyText = (text) => {
    const keywords = ['trapped', 'injured', 'urgent', 'sos', 'help', 'critical'];
    const match = keywords.find((k) => text.toLowerCase().includes(k));
    if (match) return 'high';
    if (text.length > 50) return 'medium';
    return 'low';
  };

  const verifyImage = async () => {
    const res = await fetch(`http://localhost:5000/api/disasters/${selected}/verify-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrl })
    });
    const data = await res.json();
    const classified = classifyText(imageUrl);
    setVerifyResult({ ...data, classification: classified });
  };

  const fetchResources = async () => {
    const query = `
      [out:json];
      node["amenity"="hospital"](around:5000,${location.lat},${location.lon});
      out;
    `;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: 'POST',
      body: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = await res.json();
    const hospitals = data.elements.map(h => ({
      name: h.tags.name || 'Unnamed Hospital',
      lat: h.lat,
      lon: h.lon
    }));

    setResourceResults(hospitals);
  };

  const highlightPriority = (text) => {
    return /\burgent\b|\bsos\b|\bemergency\b/i.test(text);
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

          <h4>📢 Social Media Feed</h4>
          {socialFeed.map((msg, idx) => (
            <div key={idx} style={{ background: highlightPriority(msg.post) ? '#ffe0e0' : '#f0f0f0', padding: '0.5rem', marginBottom: '0.5rem' }}>
              <strong>{msg.user}:</strong> {msg.post}
              <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
              {highlightPriority(msg.post) && <strong style={{ color: 'red' }}> ⚠️ PRIORITY</strong>}
            </div>
          ))}

          <h4>🧽 Resource Lookup (Real Hospitals via OSM)</h4>
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
          <button onClick={fetchResources}>Find Nearby Hospitals</button>
          {resourceResults && resourceResults.map((h, i) => (
            <div key={i}>
              🏥 <strong>{h.name}</strong> — {h.lat}, {h.lon}
            </div>
          ))}
          <div id="map" style={{ height: '300px', marginTop: '1rem' }}></div>

          <h4>🖼️ Image Verification</h4>
          <input
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button onClick={verifyImage}>Verify Image</button>
          {verifyResult && (
            <pre>{JSON.stringify(verifyResult, null, 2)}</pre>
          )}
          {verifyResult?.classification && (
            <p>
              Classification: <strong>{verifyResult.classification.toUpperCase()}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}