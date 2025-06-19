// src/App.jsx
import React from 'react';
import DisasterForm from './components/DisasterForm';
import DisasterList from './components/DisasterList';
import GeocodeTool from './components/GeocodeTool';
import RealTimeLog from './components/RealTimeLog';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>✨ Disaster Response Platform UI</h1>
      <DisasterForm />
      <hr />
      <GeocodeTool />
      <hr />
      <DisasterList />
      <hr />
      <RealTimeLog />
    </div>
  );
}
