import { Server } from "socket.io";

export const createSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("studentLocationUpdate", (data) => {
      console.log("Received studentLocationUpdate:", data);
      socket.broadcast.emit("studentLocationUpdate", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  
  return io;
};