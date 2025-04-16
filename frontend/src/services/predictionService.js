// Update the API_URL to be environment-aware
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const predictPlacement = async (formData) => {
  try {
    console.log("Sending prediction request with data:", formData);
    
    // Add error handling for network issues
    try {
      // Send the form data to the backend API
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Received prediction response:", data);
      
      return data;
    } catch (fetchError) {
      if (fetchError.message.includes('Failed to fetch')) {
        console.error(`Connection error: Could not connect to ${API_URL}. Is the backend server running?`);
      }
      throw fetchError;
    }
  } catch (error) {
    console.error("Error in prediction service:", error);
    throw error;
  }
};
