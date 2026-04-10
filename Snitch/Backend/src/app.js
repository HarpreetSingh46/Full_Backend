import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);


export default app;