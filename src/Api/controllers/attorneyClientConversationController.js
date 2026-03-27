const AttorneyClientConversation = require("../models/attorney-client-ConversationModel");

// ✅ CREATE MESSAGE
exports.createMessage = async (req, res) => {
  try {
    const { attorneyId, clientId, senderType, message } = req.body;

    if (!attorneyId || !clientId || !senderType || !message) {
      return res.status(400).json({
        status: false,
        message: "All fields required",
      });
    }

    if (!["attorney", "client"].includes(senderType)) {
      return res.status(400).json({
        status: false,
        message: "Invalid senderType",
      });
    }

    const chat = await AttorneyClientConversation.create({
      attorneyId,
      clientId,
      senderType,
      message,
    });

    res.status(201).json({
      status: true,
      message: "Message sent",
      data: chat,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.getByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;

    const chats = await AttorneyClientConversation.findAll({
      where: { clientId },
      order: [["createdAt", "ASC"]],
    });

    res.json({
      status: true,
      total: chats.length,
      data: chats,
    });

  } catch (error) {
    res.status(500).json({ status: false });
  }
};

exports.getByAttorneyId = async (req, res) => {
  try {
    const { attorneyId } = req.params;

    const chats = await AttorneyClientConversation.findAll({
      where: { attorneyId },
      order: [["createdAt", "ASC"]],
    });

    res.json({
      status: true,
      total: chats.length,
      data: chats,
    });

  } catch (error) {
    res.status(500).json({ status: false });
  }
};

exports.getByAttorneyId = async (req, res) => {
  try {
    const { attorneyId } = req.params;

    const chats = await AttorneyClientConversation.findAll({
      where: { attorneyId },
      order: [["createdAt", "ASC"]],
    });

    res.json({
      status: true,
      total: chats.length,
      data: chats,
    });

  } catch (error) {
    res.status(500).json({ status: false });
  }
};

exports.getChat = async (req, res) => {
  try {
    const { attorneyId, clientId } = req.params;

    const chats = await AttorneyClientConversation.findAll({
      where: { attorneyId, clientId },
      order: [["createdAt", "ASC"]],
    });

    res.json({
      status: true,
      data: chats,
    });

  } catch (error) {
    res.status(500).json({ status: false });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await AttorneyClientConversation.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Message not found",
      });
    }

    res.json({
      status: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ status: false });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const chats = await AttorneyClientConversation.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: true,
      total: chats.length,
      data: chats,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const chat = await AttorneyClientConversation.findByPk(id);

    if (!chat) {
      return res.status(404).json({
        status: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      status: true,
      data: chat,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};