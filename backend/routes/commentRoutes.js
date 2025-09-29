import express from "express";
import { createComment, getCommentsByArticle, updateComment, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComment);           
router.get("/:articleId", getCommentsByArticle);    
router.put("/:id", protect, updateComment);          
router.delete("/:id", protect, deleteComment);     

export default router;
