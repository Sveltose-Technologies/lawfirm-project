const Promoter = require("../models/promotersModel");

/* ================= CREATE ================= */
exports.createPromoter = async (req, res) => {
  try {
    const {
      adminId,
      personName,
      designation,
      specialization,
    } = req.body;

    const promoter = await Promoter.create({
      adminId,
      bannerImage: req.files?.bannerImage?.[0]?.path || req.body.bannerImage,
      personName,
      personImage: req.files?.personImage?.[0]?.path || req.body.personImage,
      designation,
      specialization,
    });

    res.status(201).json({
      success: true,
      message: "Promoter created successfully",
      data: promoter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
exports.getAllPromoters = async (req, res) => {
  try {
    const promoters = await Promoter.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, data: promoters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET BY ID ================= */
exports.getPromoterById = async (req, res) => {
  try {
    const { id } = req.params;
    const promoter = await Promoter.findByPk(id);
    if (!promoter) {
      return res.status(404).json({ success: false, message: "Promoter not found" });
    }
    res.status(200).json({ success: true, data: promoter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ================= UPDATE ================= */
exports.updatePromoter = async (req, res) => {
  try {
    const { id } = req.params;
    const promoter = await Promoter.findByPk(id);
    if (!promoter) return res.status(404).json({ success: false, message: "Promoter not found" });

    await promoter.update({
      adminId: req.body.adminId || promoter.adminId,
      bannerImage: req.files?.bannerImage?.[0]?.path || promoter.bannerImage,
      personName: req.body.personName || promoter.personName,
      personImage: req.files?.personImage?.[0]?.path || promoter.personImage,
      designation: req.body.designation || promoter.designation,
      specialization: req.body.specialization || promoter.specialization,
    });

    res.status(200).json({ success: true, message: "Promoter updated successfully", data: promoter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= DELETE ================= */
exports.deletePromoter = async (req, res) => {
  try {
    const { id } = req.params;
    const promoter = await Promoter.findByPk(id);
    if (!promoter) return res.status(404).json({ success: false, message: "Promoter not found" });

    await promoter.destroy();
    res.status(200).json({ success: true, message: "Promoter deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
