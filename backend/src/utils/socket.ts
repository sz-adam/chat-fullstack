import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// socket io szerver
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
export function getReceiverSocketId(userId: number) {
  return userSocketMap[userId];
}

const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket: Socket) => {
  console.log("A user connected", socket.id);

  // A userId a kliens kéréséből (query param) kerül lekérésre
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User with ID ${userId} is online.`);
  }

  // Az összes online felhasználó listájának küldése a csatlakozott felhasználóknak
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Ha a felhasználó lecsatlakozik
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId]; // Eltávolítjuk a lecsatlakozott felhasználót
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Frissítjük az online felhasználókat
    }
  });
});

export { io, app, server };
