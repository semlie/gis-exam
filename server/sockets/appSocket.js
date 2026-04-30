import { Server } from "socket.io";

// שמירת מופע Socket.IO גלובלי לשימוש מודולים אחרים בשרת
let io;

export const createSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // כאשר לקוח שולח עדכון מיקום תלמיד, משדרים אותו לכל הלקוחות האחרים
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

// מחזירה את מופע Socket.IO המשותף למקרים בהם בקר בשרת צריך לשדר אירועים
export const getIo = () => io;
