import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS middleware - ADD THIS
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

app.get("/health", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});