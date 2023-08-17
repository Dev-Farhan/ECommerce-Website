import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productsRoute.js";
import cors from "cors";
//configure env
dotenv.config();

//connect database
connectDB();

//rest object
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-Commerce APP</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(chalk.bgMagenta`Server Running on localhost:${process.env.PORT}`);
});
