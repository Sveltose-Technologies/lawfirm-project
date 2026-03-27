const AttorneyConversation = require("../models/attorneyConversationModel");

exports.createAttorneyConversation = async (req, res) => {
  try {
    const { adminId, attorneyId, senderType, message } = req.body;

    if (!adminId || !attorneyId || !senderType || !message) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    if (!["admin", "attorney"].includes(senderType)) {
      return res.status(400).json({
        status: false,
        message: "senderType must be admin or attorney",
      });
    }

    const chat = await AttorneyConversation.create({
      adminId,
      attorneyId,
      senderType,
      message,
    });

    res.status(201).json({
      status: true,
      message: "Message sent successfully",
      data: chat,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.getConversationBetweenUsers = async (req, res) => {
  try {
    const { adminId, attorneyId } = req.params;

    const chats = await AttorneyConversation.findAll({
      where: { adminId, attorneyId },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({
      status: true,
      total: chats.length,
      data: chats,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error" });
  }
};

exports.getConversationByAdminId = async (req, res) => {
  try {
    const { adminId } = req.params;

    const chats = await AttorneyConversation.findAll({
      where: { adminId },
      order: [["createdAt", "ASC"]],
    });

    res.json({
      status: true,
      data: chats,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error" });
  }
};

exports.getConversationByAttorneyId = async (req, res) => {
  try {
    const { attorneyId } = req.params;

    const chats = await AttorneyConversation.findAll({
      where: { attorneyId },
      order: [["createdAt", "ASC"]],
    });

    res.json({
      status: true,
      data: chats,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error" });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await AttorneyConversation.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    res.json({
      status: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error" });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const { id } = req.params;

    const chat = await AttorneyConversation.findByPk(id);

    if (!chat) {
      return res.status(404).json({
        status: false,
        message: "Not found",
      });
    }

    res.json({
      status: true,
      data: chat,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Error" });
  }
};

// get conversation by clientId
exports.getConversationByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({
        status: false,
        message: "clientId is required",
      });
    }

    const chats = await ClientConversation.findAll({
      where: { clientId },
      order: [["createdAt", "ASC"]],
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