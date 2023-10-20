const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let counter = 0;

function sendHeartbeatToAllClients(wss) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "heartbeat" }));
    }
  });
}

const heartbeatInterval = setInterval(() => {
  sendHeartbeatToAllClients(wss);
}, 5000);

const handleMessage = (ws) => (message) => {
  try {
    const m = message.toString();
    const p = JSON.parse(m);
    console.log({ parsedMessage: p, rawMessage: m });

    switch (true) {
      case p.type === "increment-counter":
        counter++;
        ws.send(JSON.stringify({ type: "report-counter", payload: counter }));
        break;
      case p.type === "decrement-counter":
        counter--;
        ws.send(JSON.stringify({ type: "report-counter", payload: counter }));
        break;
      default:
        ws.send(`message received on SERVER ${message}`);
        break;
    }
  } catch (err) {
    console.error("Failed to handle message.");
  }
};

wss.on("connection", (ws) => {
  console.log("Client connected");
  console.log(`Total connected clients: ${wss.clients.size}`);

  // Handle messages received from the client
  ws.on("message", (message) => {
    handleMessage(ws)(message);
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    console.log(`Total connected clients: ${wss.clients.size}`);
  });
});

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
