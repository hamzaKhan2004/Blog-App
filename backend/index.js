import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Mongodb Is Connected"))
  .catch((error) => console.log("Mongodb Error : ", error.message));

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
