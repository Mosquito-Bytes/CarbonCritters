const url = require("url");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { faker } = require("@faker-js/faker");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

function mockUser(opts) {
    const { userId, score, name} = opts || {};

  return {
    userId: userId || faker.number.int({ min: 10, max: 1000 }),
    name: name || faker.person.fullName(),
    score: score || {
      total: 0,
      diff: 0,
    },
  };
}

let defaultUsers = [mockUser({userId: 0, score: { total: 0, diff: 0}}), mockUser({ userId: 1, score: { total: 10, diff: 10 } }), mockUser({ userId: 2, score: { total: -10, diff: -10 }}), mockUser()];

function mockLeaderBoard() {
  const board = [...defaultUsers];

  const result = {
    type: "ws/server/leaderboard",
    payload: {
      users: faker.helpers.shuffle(board),
    },
  };

  return JSON.stringify(result);
}

function sendLeaderBoard(wss) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(mockLeaderBoard());
    }
  });
}

const leaderboard = (wss) => {
  sendLeaderBoard(wss);

  setTimeout(() => {
    leaderboard(wss);
  }, 3000);
};

const handleMessage = (ws) => (message) => {
  try {
    const m = message.toString();
    const p = JSON.parse(m);

    switch (true) {
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

wss.on("connection", (ws, req) => {
  console.log("Client connected");
  console.log(`Total connected clients: ${wss.clients.size}`);

  const parsedUrl = url.parse(req.url, true);
  const { userId } = parsedUrl.query;

  ws.send(
    JSON.stringify({ type: "ws/server/user", payload: defaultUsers[userId] }),
  );

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
leaderboard(wss);

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
