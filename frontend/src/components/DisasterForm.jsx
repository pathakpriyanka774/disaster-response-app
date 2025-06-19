// src/components/DisasterForm.jsx
import React, { useState } from 'react';

export default function DisasterForm() {
  const [form, setForm] = useState({
    title: '',
    location_name: '',
    description: '',
    tags: '',
    owner_id: 'netrunnerX'
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/api/disasters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim())
      })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Create New Disaster</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} /><br />
      <input name="location_name" placeholder="Location Name" value={form.location_name} onChange={handleChange} /><br />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />
      <input name="tags" placeholder="Tags (comma-separated)" value={form.tags} onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Create</button>

      {result && (
        <pre style={{ background: '#f0f0f0', padding: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
