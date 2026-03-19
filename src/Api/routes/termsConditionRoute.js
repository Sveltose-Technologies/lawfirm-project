const express = require("express");
const { createTerms, getAllTerms, getTermsById, updateTerms, deleteTerms } = require("../controllers/termsConditionController");

const router = express.Router();

router.post("/create", createTerms);
router.get("/getall", getAllTerms);
router.get("/get/:id", getTermsById);
router.put("/update/:id", updateTerms);
router.delete("/delete/:id", deleteTerms);

module.exports = router;
