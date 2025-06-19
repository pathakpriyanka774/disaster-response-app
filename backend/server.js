const http = require('http');
const app = require('./app');
const { setupWebSocket } = require('./utils/websocket');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Create HTTP server and pass it to WebSocket
const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});