import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  PrathmeshBhoir,
  OmPimple,
  JayZore,
  JugeshPawse,
  PravinZanjure,
} from "../assets";

const About = () => {
  const teamMembers = [
    {
      name: "Prathmesh Bhoir",
      role: "ML Engineer",
      image: PrathmeshBhoir,
    },
    {
      name: "Om Pimple",
      role: "Frontend Developer",
      image: OmPimple,
    },
    {
      name: "Jay Zore",
      role: "Backend Developer",
      image: JayZore,
    },
    {
      name: "Jugesh Pawse",
      role: "Data Scientist",
      image: JugeshPawse,
    },
    {
      name: "Pravin Zanjure",
      role: "UI/UX Designer",
      image: PravinZanjure,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Our Project
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
            PlacementPredictor is a machine learning-based application designed
            to help students predict their placement chances based on their
            academic and personal attributes.
          </p>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mt-4 px-2 sm:px-0">
            Our model is trained on historical student data and uses a Random
            Forest algorithm to provide accurate predictions that can help
            students understand their strengths and areas for improvement.
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Meet Our Team
        </h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-full w-48 h-48 sm:w-64 sm:h-64 flex flex-col items-center justify-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(to bottom, #ffffff, #f0f9ff)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 sm:mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-blue-600 mb-1 sm:mb-2">
                {member.role}
              </p>
              <div className="flex space-x-3 mt-1 sm:mt-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <FaGithub size={16} className="sm:text-xl" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaLinkedin size={16} className="sm:text-xl" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-20 text-center max-w-3xl mx-auto px-2 sm:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            We created this project as part of our Machine Learning Lab to help
            students understand their placement prospects and identify areas
            where they can improve. By leveraging machine learning algorithms,
            we aim to provide personalized insights that can guide students in
            their career preparation journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
