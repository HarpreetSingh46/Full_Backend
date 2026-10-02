import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import  {createPod}  from "./kubernnetes/pod.js";
import {createService} from "./kubernnetes/service.js";
import {v7 as uuid} from "uuid"
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
app.post("/api/sandbox/start", async (req, res) => {
  try {
    const sandboxId = uuid();
    const pod = await createPod(sandboxId);
    const service = await createService(sandboxId);
    res.status(201).json({
      previewUrl: `http://${sandboxId}.preview.localhost:5173`,
      message: "Sandbox started successfully",
      status: "success",
      pod,
      service
    });
  } catch (error) {
    console.error("Error starting sandbox:", error);
    res.status(500).json({
      message: "Failed to start sandbox",
      status: "error"
    });
  }
});

export default app;