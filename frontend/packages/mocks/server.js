const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message to the client
    ws.send('Welcome to the mock WebSocket server!');

    // Handle messages received from the client
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server started on http://localhost:8080');
});

