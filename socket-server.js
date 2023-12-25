const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

// Initial data for the sidebar
let sidebarData = [
  {
    id: uuidv4(),
    title: "Unveiling the Mystique of Crystal Daggers: A Blend of Elegance and Spiritual Power",
  },
  {
    id: uuidv4(),
    title: "Navigating UK VAT Returns: Tips for Success with",
  },
  {
    id: uuidv4(),
    title: "Navigating Project Success with Rolling Wave Planning",
  },
  {
    id: uuidv4(),
    title: "Unveiling the Mystique of Crystal Daggers: A Blend of Elegance and Spiritual Power",
  },
  {
    id: uuidv4(),
    title: "TLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
  },
  {
    id: uuidv4(),
    title: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    id: uuidv4(),
    title: "Duis aute irure dolor in reprehenderit in voluptate velit esse",
    children: [
      {
        title: "Lorem ipsum dolor sit amet",
        id: uuidv4(),
        children: [
          { id: uuidv4(), title: "uis aute irure dolor in reprehenderit in voluptate", type: "text" },
          { id: uuidv4(), url: "https://www.google.com.ua", type: "link", title: "Google" },
          { id: uuidv4(), type: "file", fileName: "fileName 123" },
          { id: uuidv4(), title: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt", type: "text" },
          { id: uuidv4(), title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", type: "text" },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Duis aute irure dolor in reprehenderit in voluptate velit esse",
    children: [
      {
        title: "uis aute irure dolor in reprehenderit in voluptate",
        id: uuidv4(),
        children: [
          { id: uuidv4(), title: "uis aute irure dolor in reprehenderit in voluptate" },
          { id: uuidv4(), title: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt" },
          { id: uuidv4(), title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
          { id: uuidv4(), url: "https://www.google.com.ua", type: "link", title: "Google" },
        ],
      },
    ],
  },
];

io.on("connection", (socket) => {
  console.log("Client connected");

  io.to(socket.id).emit("updateData", sidebarData);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("updateServerData", (newData) => {
    console.log("Received request to update server data...");

    sidebarData = newData;

    io.emit("updateData", sidebarData);
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
