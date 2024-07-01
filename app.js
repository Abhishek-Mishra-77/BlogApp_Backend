import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

mongoose
  .connect(
    "mongodb+srv://abhishekomr07:root@cluster0.izbi4zz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Database connected and server is running on 5000 port")
  )
  .catch((error) => console.log(error));
