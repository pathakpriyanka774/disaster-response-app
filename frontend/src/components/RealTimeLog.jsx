import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function RealTimeLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket server');
    });

    socket.onAny((event, message) => {
      setLogs((prev) => [...prev, `[${event}] ${typeof message === 'string' ? message : JSON.stringify(message)}`]);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket');
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>🔴 Real-Time Log (WebSocket)</h2>
      <div style={{ background: '#111', color: '#0f0', padding: '1rem', height: '200px', overflowY: 'auto' }}>
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>
    </div>
  );
}
