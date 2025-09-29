import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { articleId, text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await Comment.create({
      articleId,
      userId: req.user.id, 
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error: error.message });
  }
};


export const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await Comment.find({ articleId })
      .populate("userId", "username email") 
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};


export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = text || comment.text;
    const updatedComment = await comment.save();

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error: error.message });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};
