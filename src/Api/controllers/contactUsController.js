const Enquiry = require("../models/contactUsModel");

/* ================= CREATE ================= */
exports.createEnquiry = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      inquiryType,
      message,
    } = req.body;

    const enquiry = await Enquiry.create({
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      inquiryType,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ================= */
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET BY ID ================= */
exports.getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByPk(id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    await enquiry.destroy();

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      inquiryType,
      message,
    } = req.body;

    const enquiry = await Enquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    await enquiry.update({
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      inquiryType,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
