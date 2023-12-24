import express from "express";
const router = express.Router();

import { getNews, getNewsById, createNews, updateNews, deleteNews } from "../controllers/newsController.js";


router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);



export default router;