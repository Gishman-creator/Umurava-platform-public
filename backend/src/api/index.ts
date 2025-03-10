import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import logger from "@/utils/logger";
import userRoutes from "../routes/userRoutes";
import challengeRoutes from "../routes/challengeRoutes";
import imageRoutes from "../routes/imageRoutes";
import config from "../config/config";
import serverless from "serverless-http";
import path from "path";

dotenv.config();

const app: Express = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static file handling (NOTE: Vercel does not support persistent file storage)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Database connection
mongoose
  .connect(config.mongoUrl)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => {
    logger.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/images", imageRoutes);

// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Export for serverless
module.exports = app;
module.exports.handler = serverless(app);
