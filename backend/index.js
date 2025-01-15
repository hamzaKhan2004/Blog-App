import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import path from "path";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Mongodb Is Connected"))
  .catch((error) => console.log("Mongodb Error : ", error.message));

const __dirname = path.resolve();

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//user routes
app.use("/api/user", userRoutes);
//auth routes
app.use("/api/auth", authRoutes);
//post routes
app.use("/api/post", postRoutes);
//comment routes
app.use("/api/comment", commentRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () =>
  console.log("Server Is Running On Port http://localhost:3000")
);
