const News = require("../models/newsModel");

/**
 * CREATE NEWS
 */
exports.createNews = async (req, res) => {
  try {
    const data = await News.create({
      ...req.body,
      bannerImage: req.files?.bannerImage?.[0]?.filename,
      newsImage: req.files?.newsImage?.[0]?.filename,
    });

    res.status(201).json({
      status: true,
      message: "News created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

/**
 * GET ALL
 */
exports.getAllNews = async (req, res) => {
  try {
    const data = await News.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

/**
 * GET BY ID
 */
exports.getNewsById = async (req, res) => {
  try {
    const data = await News.findByPk(req.params.id);

    if (!data) {
      return res
        .status(404)
        .json({ status: false, message: "News not found" });
    }

    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

/**
 * UPDATE
 */
exports.updateNews = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.bannerImage) {
      updateData.bannerImage = req.files.bannerImage[0].filename;
    }

    if (req.files?.newsImage) {
      updateData.newsImage = req.files.newsImage[0].filename;
    }

    const updated = await News.update(updateData, {
      where: { id: req.params.id },
    });

    if (!updated[0]) {
      return res
        .status(404)
        .json({ status: false, message: "News not found" });
    }

    const data = await News.findByPk(req.params.id);

    res.status(200).json({
      status: true,
      message: "News updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

/**
 * DELETE
 */
exports.deleteNews = async (req, res) => {
  try {
    const deleted = await News.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ status: false, message: "News not found" });
    }

    res.status(200).json({
      status: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
