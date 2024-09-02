import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

import taskRoutes from "./routes/tasks.js";

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
