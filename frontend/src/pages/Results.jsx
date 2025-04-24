import React, { useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeft, FaRedo, FaPrint, FaDownload } from "react-icons/fa";
import ReportGenerator from "../components/ReportGenerator";
import { MODEL_INFO } from "../services/predictionService";

const Results = () => {
  const location = useLocation();
  const prediction = location.state?.prediction;
  const probability = location.state?.probability;
  const studentData = location.state?.formData;
  const modelName = location.state?.model;
  const modelAccuracy = location.state?.accuracy;
  const isMounted = useRef(true);

  // Create report generator instance
  const reportGeneratorInstance = ReportGenerator();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Format functions
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatProbability = (prob) => {
    return prob ? (prob * 100).toFixed(2) + "%" : "N/A";
  };

  const formatAccuracy = (acc) => {
    if (!acc && modelName && MODEL_INFO[modelName]) {
      return (MODEL_INFO[modelName].accuracy * 100).toFixed(2) + "%";
    }
    return acc ? (acc * 100).toFixed(2) + "%" : "N/A";
  };

  const getModelDisplayName = () => {
    if (modelName && MODEL_INFO[modelName]) {
      return MODEL_INFO[modelName].name;
    }
    return modelName || "Machine Learning Model";
  };

  // Print function that uses the ReportGenerator
  const handlePrint = () => {
    reportGeneratorInstance.generateReport(
      prediction,
      probability,
      studentData,
      "print",
      modelName,
      modelAccuracy
    );
  };

  // Download function that uses the ReportGenerator
  const handleDownload = () => {
    reportGeneratorInstance.generateReport(
      prediction,
      probability,
      studentData,
      "download",
      modelName,
      modelAccuracy
    );
  };

  // Display UI for no prediction data
  if (prediction === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-800">
            No Prediction Data
          </h1>
          <p className="mb-6 text-gray-600">
            Please submit the prediction form first to see results.
          </p>
          <Link
            to="/predict"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" /> Go to Prediction Form
          </Link>
        </div>
      </div>
    );
  }

  // Main UI with prediction results
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-blue-800">
          Your Placement Prediction
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            <FaPrint /> Print Report
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <FaDownload /> Download PDF
          </button>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <Link
              to="/predict"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              <FaArrowLeft className="mr-2" /> Back to Form
            </Link>
            <Link
              to="/predict"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              <FaRedo className="mr-2" /> New Prediction
            </Link>
          </div>
        </div>

        {/* Display results using Tailwind styling */}
        <div
          className="bg-white rounded-xl shadow-lg p-4 sm:p-8"
          id="report-container"
        >
          <div className="text-center mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
              Placement Prediction Report
            </h2>
            <p className="text-gray-600 mt-2">Generated on {formatDate()}</p>
            <p className="text-gray-600 mt-1">
              Using <span className="font-medium">{getModelDisplayName()}</span>{" "}
              with accuracy {formatAccuracy(modelAccuracy)}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
              Student Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">Gender:</p>
                <p>{studentData?.gender || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">Stream:</p>
                <p>{studentData?.stream || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">10th Board:</p>
                <p>{studentData?.tenthBoard || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">10th Marks:</p>
                <p>
                  {studentData?.tenthMarks
                    ? `${studentData.tenthMarks}%`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">12th Board:</p>
                <p>{studentData?.twelfthBoard || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">12th Marks:</p>
                <p>
                  {studentData?.twelfthMarks
                    ? `${studentData.twelfthMarks}%`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">CGPA:</p>
                <p>{studentData?.cgpa || "N/A"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">
                  Communication Level:
                </p>
                <p>
                  {studentData?.communicationLevel
                    ? `${studentData.communicationLevel}/5`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-700">
                  Additional Qualifications:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  {studentData?.internships && <li>Internship Experience</li>}
                  {studentData?.training && <li>Training</li>}
                  {studentData?.innovativeProject && (
                    <li>Innovative Project</li>
                  )}
                  {studentData?.technicalCourse && <li>Technical Course</li>}
                  {studentData?.backlog && (
                    <li className="text-red-500">Backlog in 5th Semester</li>
                  )}
                  {!studentData?.internships &&
                    !studentData?.training &&
                    !studentData?.innovativeProject &&
                    !studentData?.technicalCourse &&
                    !studentData?.backlog && (
                      <li className="text-gray-500">None specified</li>
                    )}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
              Prediction Result
            </h3>
            <div
              className={`p-4 sm:p-6 rounded-lg ${
                prediction === 1
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-red-50 border-l-4 border-red-500"
              }`}
            >
              <h4 className="text-lg sm:text-xl font-bold mb-2">
                {prediction === 1
                  ? "Likely to be Placed"
                  : "May Need Improvement"}
              </h4>
              <p className="text-gray-700 text-sm sm:text-base">
                {prediction === 1
                  ? "Based on your profile, our model predicts that you have a good chance of placement."
                  : "Based on your profile, our model suggests you may need to improve in some areas to increase your placement chances."}
              </p>
              <p className="text-gray-700 mt-3 text-sm sm:text-base">
                <span className="font-semibold">Placement probability:</span>{" "}
                {formatProbability(probability)}
              </p>
            </div>
          </div>

          {prediction === 0 && (
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                Recommendations
              </h3>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="text-sm sm:text-base">
                      Consider taking more technical courses to enhance your
                      skills
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="text-sm sm:text-base">
                      Work on improving your communication skills through
                      workshops or practice
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="text-sm sm:text-base">
                      Try to get internship experience in your field
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="text-sm sm:text-base">
                      Participate in innovative projects to showcase your
                      practical skills
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                    <span className="text-sm sm:text-base">
                      Focus on maintaining a good CGPA throughout your academic
                      journey
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="text-center text-gray-500 text-xs sm:text-sm mt-12 pt-6 border-t border-gray-200">
            <p>
              This prediction is based on a machine learning model trained on
              historical student placement data.
            </p>
            <p>
              The {getModelDisplayName()} has an accuracy of{" "}
              {formatAccuracy(modelAccuracy)} based on test data.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} Placement Predictor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
