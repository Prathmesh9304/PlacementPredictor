import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaGraduationCap,
  FaChartLine,
  FaUserGraduate,
  FaBook,
  FaProjectDiagram,
  FaComments,
  FaLaptopCode,
  FaBrain,
} from "react-icons/fa";
import {
  predictPlacement,
  MODEL_INFO,
  getAvailableModels,
} from "../services/predictionService";

const PredictionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "",
    tenthBoard: "",
    tenthMarks: "",
    twelfthBoard: "",
    twelfthMarks: "",
    stream: "",
    cgpa: "",
    internships: false,
    training: false,
    backlog: false,
    innovativeProject: false,
    communicationLevel: 3,
    technicalCourse: false,
    modelName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsLoadingModels(true);
        const models = await getAvailableModels();
        setAvailableModels(models);

        // Remove the automatic model selection
        // Let the user explicitly choose a model
      } catch (error) {
        console.error("Failed to fetch models:", error);
        toast.error("Failed to load available models");
      } finally {
        setIsLoadingModels(false);
      }
    };

    fetchModels();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate model selection
    if (!formData.modelName) {
      toast.error("Please select a prediction model");
      return;
    }

    setIsLoading(true);

    try {
      // Send data to backend API for prediction
      const result = await predictPlacement(formData);

      toast.success("Prediction generated successfully!");
      navigate("/results", {
        state: {
          prediction: result.placed,
          probability: result.probability,
          formData: formData,
          model: result.model,
          accuracy: result.accuracy,
        },
      });
    } catch (error) {
      toast.error(`Error: ${error.message || "Failed to generate prediction"}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format accuracy as percentage
  const formatAccuracy = (accuracy) => {
    return (accuracy * 100).toFixed(2) + "%";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-6 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-800 mb-2 sm:mb-3">
            Placement Prediction Form
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Fill in your details below to get a prediction of your placement
            chances based on our machine learning model.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Gender */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaUserGraduate className="mr-2 text-blue-600" /> Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* 10th Board */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaBook className="mr-2 text-blue-600" /> 10th Board
              </label>
              <select
                name="tenthBoard"
                value={formData.tenthBoard}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                required
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="WBBSE">WBBSE</option>
              </select>
            </div>

            {/* 10th Marks */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaChartLine className="mr-2 text-blue-600" /> 10th Marks (%)
              </label>
              <input
                type="number"
                name="tenthMarks"
                value={formData.tenthMarks}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            {/* 12th Board */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaBook className="mr-2 text-blue-600" /> 12th Board
              </label>
              <select
                name="twelfthBoard"
                value={formData.twelfthBoard}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                required
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ISE">ISE</option>
                <option value="WBCHSE">WBCHSE</option>
                <option value="Other state Board">Other state Board</option>
              </select>
            </div>

            {/* 12th Marks */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaChartLine className="mr-2 text-blue-600" /> 12th Marks (%)
              </label>
              <input
                type="number"
                name="twelfthMarks"
                value={formData.twelfthMarks}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            {/* Stream */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaGraduationCap className="mr-2 text-blue-600" /> Stream
              </label>
              <select
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                required
              >
                <option value="">Select Stream</option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Science in AIML">
                  Computer Science in AIML
                </option>
                <option value="Computer Science in Data Science">
                  Computer Science in Data Science
                </option>
                <option value="Computer Science and Design">
                  Computer Science and Design
                </option>
                <option value="Electrical and Electronics Engineering">
                  Electrical and Electronics Engineering
                </option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Production Engineering">
                  Production Engineering
                </option>
                <option value="IMsc Maths and Computing">
                  IMsc Maths and Computing
                </option>
              </select>
            </div>

            {/* CGPA */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaChartLine className="mr-2 text-blue-600" /> CGPA
              </label>
              <input
                type="number"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                min="0"
                max="10"
                step="0.01"
                required
              />
            </div>

            {/* Communication Level */}
            <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg">
              <label className="flex items-center text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                <FaComments className="mr-2 text-blue-600" /> Communication
                Level (1-5)
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="communicationLevel"
                  value={formData.communicationLevel}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  min="1"
                  max="5"
                  required
                />
                <span className="ml-3 font-medium text-blue-600">
                  {formData.communicationLevel}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-800 flex items-center">
              <FaLaptopCode className="mr-2" /> Additional Qualifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg shadow-sm transition-all hover:shadow-md">
                <input
                  type="checkbox"
                  id="internships"
                  name="internships"
                  checked={formData.internships}
                  onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="internships"
                  className="ml-2 sm:ml-3 text-gray-700 text-sm sm:text-base"
                >
                  Internship Experience
                </label>
              </div>

              <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg shadow-sm transition-all hover:shadow-md">
                <input
                  type="checkbox"
                  id="training"
                  name="training"
                  checked={formData.training}
                  onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="training"
                  className="ml-2 sm:ml-3 text-gray-700 text-sm sm:text-base"
                >
                  Training
                </label>
              </div>

              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm transition-all hover:shadow-md">
                <input
                  type="checkbox"
                  id="backlog"
                  name="backlog"
                  checked={formData.backlog}
                  onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="backlog"
                  className="ml-2 sm:ml-3 text-gray-700 text-sm sm:text-base"
                >
                  Backlog in 5th Semester
                </label>
              </div>

              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm transition-all hover:shadow-md">
                <input
                  type="checkbox"
                  id="innovativeProject"
                  name="innovativeProject"
                  checked={formData.innovativeProject}
                  onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="innovativeProject"
                  className="ml-2 sm:ml-3 text-gray-700 text-sm sm:text-base"
                >
                  Innovative Project
                </label>
              </div>

              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm transition-all hover:shadow-md">
                <input
                  type="checkbox"
                  id="technicalCourse"
                  name="technicalCourse"
                  checked={formData.technicalCourse}
                  onChange={handleChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="technicalCourse"
                  className="ml-2 sm:ml-3 text-gray-700 text-sm sm:text-base"
                >
                  Technical Course
                </label>
              </div>
            </div>
          </div>

          {/* Model Selection */}
          <div className="mt-6 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-800 flex items-center">
              <FaBrain className="mr-2" /> Select Prediction Model
            </h3>

            {isLoadingModels ? (
              <div className="text-center py-4">
                <p className="text-gray-600">Loading available models...</p>
              </div>
            ) : (
              <div className="transition-all duration-300 hover:shadow-md p-3 sm:p-4 rounded-lg bg-white">
                <select
                  name="modelName"
                  value={formData.modelName}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                  required
                >
                  <option value="">Select Model</option>
                  {availableModels.map((modelName) => (
                    <option key={modelName} value={modelName}>
                      {MODEL_INFO[modelName]?.name || modelName} - Accuracy:{" "}
                      {formatAccuracy(MODEL_INFO[modelName]?.accuracy || 0)}
                    </option>
                  ))}
                </select>

                {formData.modelName && MODEL_INFO[formData.modelName] && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-800">
                      Selected Model: {MODEL_INFO[formData.modelName].name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Accuracy:{" "}
                      {formatAccuracy(MODEL_INFO[formData.modelName].accuracy)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {availableModels.length === 0 && !isLoadingModels && (
              <div className="text-center py-4">
                <p className="text-red-500">
                  No models available. Using default model.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white rounded-lg font-medium text-base sm:text-lg shadow-md 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700 transform hover:scale-105"
                } 
                transition-all duration-300`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Generate Prediction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;
