const express = require("express");
const upload = require("../middleware/upload");
const { createAward, getAllAwards, getAwardById, updateAward, deleteAward } = require("../controllers/awardsController");

const router = express.Router();

router.post("/create", upload.single("bannerImage"), createAward);
router.get("/getall", getAllAwards);
router.get("/get/:id", getAwardById);
router.put("/update/:id", upload.single("bannerImage"), updateAward);
router.delete("/delete/:id", deleteAward);

module.exports = router;
