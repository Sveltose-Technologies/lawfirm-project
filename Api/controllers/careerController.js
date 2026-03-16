const Career = require("../models/careerModel");

/* ================= CREATE JOB ================= */
exports.createCareer = async (req, res) => {
  try {
    const {
      adminId,
      jobTitle,
      jobCode,
      address,
      location,
      jobType,
      textEditor,
    } = req.body;

    if (!adminId || !jobTitle || !jobCode || !location || !jobType || !textEditor) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

const bannerImage = req.file ? `/uploads/${req.file.filename}` : null;

    const job = await Career.create({
      adminId,
      bannerImage,
      jobTitle,
      jobCode,
      address,
      location,
      jobType,
      textEditor,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= GET ALL JOBS ================= */
exports.getAllCareers = async (req, res) => {
  try {
    const jobs = await Career.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= GET JOB BY ID ================= */
exports.getCareerById = async (req, res) => {
  try {
    const job = await Career.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= UPDATE JOB ================= */
exports.updateCareer = async (req, res) => {
  try {
    const job = await Career.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const bannerImage = req.file
  ? `/uploads/${req.file.filename}`
  : job.bannerImage;

await job.update({
  ...req.body,
  bannerImage,
});
    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= DELETE JOB ================= */
exports.deleteCareer = async (req, res) => {
  try {
    const job = await Career.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.destroy();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
