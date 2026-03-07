const express = require("express");
const upload = require("../middleware/upload");
const { createCareer, getAllCareers, getCareerById, updateCareer, deleteCareer } = require("../controllers/careerController");
const router = express.Router();


router.post("/create", upload.single("bannerImage"), createCareer);
router.get("/getall", getAllCareers);
router.get("/get/:id", getCareerById);
router.put("/update/:id", upload.single("bannerImage"), updateCareer);
router.delete("/delete/:id", deleteCareer);

module.exports = router;
