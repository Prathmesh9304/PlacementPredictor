const express = require("express");
const { PythonShell } = require("python-shell");
const path = require("path");
const fs = require("fs");
// Add dotenv to load environment variables
const dotenv = require("dotenv");
// Import the CORS middleware
const corsMiddleware = require("./middleware/cors");

// Load environment variables from single .env file
dotenv.config({
  path: path.join(__dirname, ".env"),
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Apply the CORS middleware
app.use(corsMiddleware);

// Get available models
const getAvailableModels = () => {
  try {
    const modelDir = path.join(__dirname, "model");
    const files = fs.readdirSync(modelDir);
    const models = files
      .filter(
        (file) =>
          file.startsWith("placement_predictor_") && file.endsWith(".pkl")
      )
      .map((file) =>
        file.replace("placement_predictor_", "").replace(".pkl", "")
      );
    return models;
  } catch (error) {
    console.error("Error getting available models:", error);
    return [];
  }
};

// API endpoint for prediction
app.post("/api/predict", (req, res) => {
  try {
    console.log("Received prediction request:", req.body);

    // Check if model name is provided
    if (!req.body.modelName) {
      return res.status(400).json({
        error: "No model name provided",
        available_models: getAvailableModels(),
      });
    }

    // Check if the requested model exists
    const availableModels = getAvailableModels();
    if (!availableModels.includes(req.body.modelName)) {
      return res.status(404).json({
        error: `Model '${req.body.modelName}' not found`,
        available_models: availableModels,
      });
    }

    // Configure Python options based on environment
    const pythonPath = process.env.VERCEL ? "python3" : "python";
    
    // Convert request body to Python-friendly format
    const options = {
      mode: "json",
      pythonPath: pythonPath,
      scriptPath: path.join(__dirname, "model"),
      args: [JSON.stringify(req.body)],
    };

    PythonShell.run("predict.py", options)
      .then((results) => {
        console.log("Python script results:", results);

        if (results && results.length > 0) {
          // Check if there's an error in the results
          const errorResults = results.filter((result) => result.error);
          if (errorResults.length > 0) {
            return res.status(500).json(errorResults[errorResults.length - 1]);
          }

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

// API endpoint to get available models
app.get("/api/models", (req, res) => {
  try {
    const models = getAvailableModels();
    if (models.length === 0) {
      return res.status(404).json({ error: "No models found" });
    }
    res.json({ models: models });
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ error: "Failed to fetch available models" });
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

// For Vercel serverless deployment, we need to export the app
module.exports = app;

// Only start the server if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `\n[SUCCESS] Backend server starting at http://localhost:${PORT}`
    );
    console.log(
      `[INFO] API endpoint available at http://localhost:${PORT}/api/predict\n`
    );
    console.log(`[INFO] Available models: ${getAvailableModels().join(", ")}\n`);
  });
}
