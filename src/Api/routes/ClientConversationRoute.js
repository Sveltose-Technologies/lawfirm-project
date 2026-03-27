const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientConversationController");

router.post("/send", controller.createClientConversation);

// important
router.get("/get/:adminId/:clientId", controller.getConversationBetweenUsers);

router.get("/admin/:adminId", controller.getConversationByAdminId);
router.get("/client/:clientId", controller.getConversationByClientId);

router.get("/get-all", controller.getAllConversations);
router.get("/get-by-id/:id", controller.getConversationById);
router.delete("/delete/:id", controller.deleteConversation);

module.exports = router;