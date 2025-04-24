import React from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaChartLine,
  FaLaptopCode,
  FaUserTie,
  FaArrowRight,
  FaBrain,
  FaRobot,
} from "react-icons/fa";
import { MODEL_INFO } from "../services/predictionService";

const Home = () => {
  // Get model names and info for display
  const modelEntries = Object.entries(MODEL_INFO);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-10 pb-12 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
            <div className="text-center">
              <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Placement</span>
                <span className="block text-blue-600">Predictor</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-sm sm:text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl px-4 sm:px-0">
                Predict your placement chances based on your academic and
                personal attributes using our advanced machine learning models.
              </p>
              <div className="mt-8 sm:mt-10 flex justify-center">
                <Link
                  to="/predict"
                  className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 hover:-translate-y-1"
                >
                  Start Prediction <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto lg:mx-auto">
              Our placement predictor uses multiple machine learning models
              trained on student data to predict placement outcomes.
            </p>
          </div>

          <div className="mt-10 sm:mt-16">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-blue-50 p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-blue-600 text-white mb-4">
                  <FaGraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Academic Performance
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-500">
                  We analyze your 10th & 12th marks, CGPA, and academic
                  background to assess your educational strength.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-blue-600 text-white mb-4">
                  <FaLaptopCode className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Technical Skills
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-500">
                  Your technical courses, innovative projects, and training
                  experiences are key factors in our prediction.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-blue-600 text-white mb-4">
                  <FaChartLine className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Practical Experience
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-500">
                  Internships and hands-on experience significantly impact your
                  placement prospects in the job market.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-blue-600 text-white mb-4">
                  <FaUserTie className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Soft Skills
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-500">
                  Communication skills and other soft attributes play a crucial
                  role in determining placement success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Models Section - New Section */}
      <div className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Our Models
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Advanced Prediction Models
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto lg:mx-auto">
              Choose from our selection of machine learning models, each with
              unique strengths for accurate placement prediction.
            </p>
          </div>

          <div className="mt-10 sm:mt-16">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modelEntries.map(([key, model]) => (
                <div
                  key={key}
                  className="bg-white p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-blue-600 text-white mb-4">
                    <FaBrain className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">
                    {model.name}
                  </h3>
                  <div className="mt-2 flex items-center">
                    <div className="text-blue-600 font-bold text-lg">
                      {(model.accuracy * 100).toFixed(2)}%
                    </div>
                    <div className="ml-2 text-sm text-gray-500">Accuracy</div>
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-gray-500">
                    {getModelDescription(key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by Students Across Universities
            </h2>
            <p className="mt-3 text-base sm:text-xl text-blue-200">
              Our models have been trained on real student data with high
              accuracy
            </p>
          </div>
          <dl className="mt-8 sm:mt-10 text-center grid grid-cols-1 gap-5 sm:gap-0 sm:grid-cols-3">
            <div className="flex flex-col py-4">
              <dt className="order-2 mt-2 text-base sm:text-lg leading-6 font-medium text-blue-200">
                Accuracy
              </dt>
              <dd className="order-1 text-4xl sm:text-5xl font-extrabold text-white">
                89%
              </dd>
            </div>
            <div className="flex flex-col py-4">
              <dt className="order-2 mt-2 text-base sm:text-lg leading-6 font-medium text-blue-200">
                Students
              </dt>
              <dd className="order-1 text-4xl sm:text-5xl font-extrabold text-white">
                400+
              </dd>
            </div>
            <div className="flex flex-col py-4">
              <dt className="order-2 mt-2 text-base sm:text-lg leading-6 font-medium text-blue-200">
                Models
              </dt>
              <dd className="order-1 text-4xl sm:text-5xl font-extrabold text-white">
                {modelEntries.length}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to know your chances?</span>
            <span className="block text-blue-600">
              Start your prediction today.
            </span>
          </h2>
          <div className="mt-6 lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/predict"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Get Started <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-gray-400 hover:text-gray-500">
              Built with Machine Learning
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:order-1">
            <p className="text-center text-sm sm:text-base text-gray-400">
              &copy; {new Date().getFullYear()} Placement Predictor. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper function to get model descriptions
const getModelDescription = (modelKey) => {
  const descriptions = {
    linear_regression:
      "Uses linear relationships between features to predict placement probability.",
    logistic_regression:
      "Specializes in binary classification, ideal for yes/no placement predictions.",
    decision_tree:
      "Creates a flowchart-like structure to make decisions based on your attributes.",
    random_forest:
      "Combines multiple decision trees for more robust and accurate predictions.",
    svm: "Support Vector Machine excels at finding optimal boundaries between placement outcomes.",
    naive_bayes:
      "Probabilistic classifier based on applying Bayes' theorem with independence assumptions.",
    knn: "K-Nearest Neighbors algorithm classifies based on similar student profiles.",
    neural_network:
      "Mimics human brain structure to identify complex patterns in student data.",
    gradient_boosting:
      "Builds models sequentially to correct errors from previous iterations.",
  };

  return (
    descriptions[modelKey] ||
    "Advanced machine learning model for placement prediction."
  );
};

export default Home;
