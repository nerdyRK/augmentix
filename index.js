import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import moment from "moment";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

import taskRoutes from "./routes/tasks.js";

app.use((req, res, next) => {
  const logFilePath = path.join(__dirname, "logs", "user_logs.txt");
  const userIP = req.ip;
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss"); // Readable time format
  const requestUrl = req.originalUrl; // Captures the full request URL
  const logMessage = `IP: ${userIP}, Time: ${timestamp}, URL: ${requestUrl}\n`;

  // Ensure the logs directory exists
  if (!fs.existsSync(path.join(__dirname, "logs"))) {
    fs.mkdirSync(path.join(__dirname, "logs"));
  }

  // Append the log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });

  // Move to the next middleware or route handler
  next();
});

// Serve static files from the dist directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.use("/api", taskRoutes);

// Handle any other routes and serve the index.html from dist for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
