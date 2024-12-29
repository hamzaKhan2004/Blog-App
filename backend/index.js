import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Mongodb Is Connected"))
  .catch((error) => console.log("Mongodb Error : ", error.message));
const app = express();

app.listen(3000, () =>
  console.log("Server Is Running On Port http://localhost:3000")
);
