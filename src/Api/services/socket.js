const Message = require("../models/messageModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // Register user
    socket.on("register", (userId) => {
      socket.userId = userId;
    });

    // Join room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    // Send message
    socket.on("sendMessage", async (data) => {
      const { conversationId, senderId, message } = data;

      const newMsg = await Message.create({
        conversationId,
        senderId,
        message,
      });

      io.to(conversationId).emit("receiveMessage", newMsg);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};