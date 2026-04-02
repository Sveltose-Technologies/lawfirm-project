const express = require("express");
const router = express.Router();
const controller = require("../controllers/attorneyClientConversationController");

// create message
router.post("/send", controller.createMessage);

// get by client
router.get("/client/:clientId", controller.getByClientId);

// get by attorney
router.get("/attorney/:attorneyId", controller.getByAttorneyId);

// get chat (both)
router.get("/get/:attorneyId/:clientId", controller.getChat);

// delete
router.delete("/delete/:id", controller.deleteMessage);

// get all messages
router.get("/get-all", controller.getAllMessages);

// get by id
router.get("/get-by-id/:id", controller.getMessageById);

module.exports = router;