import Article from "../models/Article.js";


export const createArticle = async (req, res) => {
  const { title, content } = req.body;

  try {
    const article = await Article.create({
      title,
      content,
      user: req.user._id, 
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("user", "username email");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

   
    if (article.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

   
    if (article.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await article.deleteOne();
    res.json({ message: "Article removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
