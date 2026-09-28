import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";



const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();    
app.get("/api/sandbox/health", (req, res) => {
  res.status(200).json({
    message: "Sandbox API is healthy",
    status: "success",
  });
});

export default app;