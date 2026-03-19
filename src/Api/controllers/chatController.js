const Chat = require("../models/chatModel");

/* ================= SEND MESSAGE ================= */
exports.sendMessage = async (req, res) => {
  try {
    const {
      roomId,
      senderId,
      senderType,
      receiverId,
      receiverType,
      message
    } = req.body;

    if (!roomId || !senderId || !senderType || !receiverId || !receiverType || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newMessage = await Chat.create({
      roomId,
      senderId,
      senderType,
      receiverId,
      receiverType,
      message
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


/* ================= GET CHAT HISTORY ================= */
exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Chat.findAll({
      where: { roomId },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({
      count: messages.length,
      messages
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};