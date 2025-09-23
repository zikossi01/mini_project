import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getArticles).post(protect, createArticle);
router
  .route("/:id")
  .get(getArticleById)
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

export default router;
