// First try to connect to localhost, then use the environment variable
const LOCAL_API_URL = "http://localhost:5000/api";
const PROD_API_URL = import.meta.env.VITE_API_URL;

// Function to check if localhost is available
const checkLocalhost = async () => {
  try {
    const response = await fetch(`${LOCAL_API_URL}/health`, { 
      method: 'GET',
      signal: AbortSignal.timeout(2000) // Timeout after 2 seconds
    });
    return response.ok;
  } catch (error) {
    console.log("Localhost not available, using production API:", error.message);
    return false;
  }
};

// Get the API URL - will be set after initialization
let API_URL = null;

// Initialize API URL
const initApiUrl = async () => {
  if (API_URL !== null) return API_URL;
  
  const isLocalhostAvailable = await checkLocalhost();
  API_URL = isLocalhostAvailable ? LOCAL_API_URL : PROD_API_URL;
  console.log(`Using API URL: ${API_URL}`);
  return API_URL;
};

// Model information for the frontend
export const MODEL_INFO = {
  linear_regression: { name: "Linear Regression", accuracy: 0.8642 },
  logistic_regression: { name: "Logistic Regression", accuracy: 0.8889 },
  decision_tree: { name: "Decision Tree", accuracy: 0.8025 },
  random_forest: { name: "Random Forest", accuracy: 0.8889 },
  svm: { name: "SVM", accuracy: 0.8642 },
  naive_bayes: { name: "Naive Bayes", accuracy: 0.6667 },
  knn: { name: "KNN", accuracy: 0.7407 },
  neural_network: { name: "Neural Network", accuracy: 0.8765 },
  gradient_boosting: { name: "Gradient Boosting", accuracy: 0.8765 },
};

// Get available models from the backend
export const getAvailableModels = async () => {
  try {
    const apiUrl = await initApiUrl();
    const response = await fetch(`${apiUrl}/models`);
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }
    const data = await response.json();
    return data.models || [];
  } catch (error) {
    console.error("Error fetching models:", error);
    // Return the hardcoded models as fallback
    return Object.keys(MODEL_INFO);
  }
};

export const predictPlacement = async (formData) => {
  try {
    console.log("Sending prediction request with data:", formData);

    // Add error handling for network issues
    try {
      const apiUrl = await initApiUrl();
      
      // Send the form data to the backend API
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API error response:", data);
        throw new Error(
          data.error || `API request failed with status ${response.status}`
        );
      }

      console.log("Received prediction response:", data);

      return data;
    } catch (fetchError) {
      if (fetchError.message.includes("Failed to fetch")) {
        console.error(
          `Connection error: Could not connect to ${API_URL}. Is the backend server running?`
        );
      }
      throw fetchError;
    }
  } catch (error) {
    console.error("Error in prediction service:", error);
    throw error;
  }
};
