let io = null;

function setupWebSocket(server) {
    const socketIO = require('socket.io');
    io = socketIO(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log('📡 WebSocket client connected');
        socket.send('👋 Welcome from WebSocket server');
    });
}

function emitEvent(event, data) {
    if (io) {
        io.emit(event, JSON.stringify({ event, data }));
    }
}

module.exports = { setupWebSocket, emitEvent };