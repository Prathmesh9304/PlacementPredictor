const express = require("express");
const cors = require("cors");
const { PythonShell } = require("python-shell");
const path = require("path");
// Add dotenv to load environment variables
const dotenv = require("dotenv");

// Load environment variables from .env file
// In production, this will load from .env.production
dotenv.config({
  path: process.env.NODE_ENV === "production" 
    ? path.join(__dirname, ".env.production") 
    : path.join(__dirname, ".env")
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173", // Vite dev server
        "http://localhost:3000", // Alternative local development
        process.env.FRONTEND_URL || "https://placement-predictor.vercel.app", // Production frontend with fallback
      ];
      
      console.log("CORS: Allowed origins:", allowedOrigins);
      console.log("CORS: Request origin:", origin);

      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// API endpoint for prediction
app.post("/api/predict", (req, res) => {
  try {
    console.log("Received prediction request:", req.body);

    // Convert request body to Python-friendly format
    const options = {
      mode: "json",
      pythonPath: "python", // or 'python3' depending on your system
      scriptPath: path.join(__dirname, "model"),
      args: [JSON.stringify(req.body)],
    };

    PythonShell.run("predict.py", options)
      .then((results) => {
        console.log("Python script results:", results);

        if (results && results.length > 0) {
          // The last result contains our prediction
          const predictionResult = results[results.length - 1];
          return res.json(predictionResult);
        } else {
          return res
            .status(500)
            .json({ error: "No prediction result returned" });
        }
      })
      .catch((err) => {
        console.error("Python script error:", err);
        console.error("Python error logs:", err.logs); // See detailed Python errors
        res.status(500).json({
          error: "Failed to run prediction model",
          details: err.message,
          logs: err.logs,
        });
      });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend server is running" });
});

// Root endpoint for basic testing
app.get("/", (req, res) => {
  res.send(
    "Placement Predictor API is running. Use /api/predict for predictions."
  );
});

app.listen(PORT, () => {
  console.log(
    `\n[SUCCESS] Backend server starting at http://localhost:${PORT}`
  );
  console.log(
    `[INFO] API endpoint available at http://localhost:${PORT}/api/predict\n`
  );
});
