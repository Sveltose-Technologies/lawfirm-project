// import express from "express";
// import upload from "../middleware/upload";
// import { deleteNews, getAllNews, getNewsById, updateNews } from "../controllers/newsController";

const express = require("express");
const upload = require("../middleware/upload"); 
const { createNews, getAllNews, getNewsById, updateNews, deleteNews } = require("../controllers/newsController");

const router = express.Router();
/**
 * CREATE
 */
router.post(
  "/create",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "newsImage", maxCount: 1 },
  ]),
  createNews
);

/**
 * READ
 */
router.get("/getall", getAllNews);
router.get("/get/:id", getNewsById);

/**
 * UPDATE
 */
router.put(
  "/update/:id",
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "newsImage", maxCount: 1 },
  ]),
  updateNews
);

/**
 * DELETE
 */
router.delete("/delete/:id", deleteNews);

module.exports = router;