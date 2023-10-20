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
      client.send(JSON.stringify({ type: "ws/server/heartbeat" }));
    }
  });
}

const heartbeat = (wss) => {
  sendHeartbeatToAllClients(wss);

  setTimeout(() => {
    heartbeat(wss);
  }, 10_000);
};

const handleMessage = (ws) => (message) => {
  try {
    const m = message.toString();
    const p = JSON.parse(m);

    switch (true) {
      case p.type === "ws/server/increment-counter":
        counter++;
        ws.send(
          JSON.stringify({
            type: "ws/client/report-counter",
            payload: counter,
          }),
        );
        break;
      case p.type === "ws/server/decrement-counter":
        counter--;
        ws.send(
          JSON.stringify({
            type: "ws/client/report-counter",
            payload: counter,
          }),
        );
        break;
      default:
        ws.send(
          JSON.stringify({
            type: "ws/client/invalid-message-type",
            payload: p,
          }),
        );
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

heartbeat(wss);

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
