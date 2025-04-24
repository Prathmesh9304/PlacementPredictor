import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";
import {
  PrathmeshBhoir,
  OmPimple,
  JayZore,
  JugeshPawse,
  PravinZanjure,
} from "../assets";

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Prathmesh Bhoir",
      image: PrathmeshBhoir,
      github: "https://github.com/Prathmesh9304",
      linkedin: "https://www.linkedin.com/in/prathmeshbhoir9304",
      description:
        "Machine Learning enthusiast with expertise in developing predictive models. Responsible for implementing the core ML algorithms in our placement prediction system and optimizing model performance.",
    },
    {
      name: "Om Pimple",
      image: OmPimple,
      github: "https://github.com/OmPimple26",
      linkedin: "https://www.linkedin.com/in/om-pimple-0042822b3",
      description:
        "Frontend developer skilled in React and modern UI frameworks. Created the responsive user interface for our application, ensuring a seamless user experience across all devices.",
    },
    {
      name: "Jay Zore",
      image: JayZore,
      github: "https://github.com/jayzore",
      linkedin: "https://www.linkedin.com/in/jayzore9730",
      description:
        "Backend developer with strong knowledge of Node.js and API development. Built the server-side architecture that powers our prediction system and handles data processing.",
    },
    {
      name: "Jugesh Pawse",
      image: JugeshPawse,
      github: "https://github.com/Jugesh-Pawase",
      linkedin: "https://www.linkedin.com/in/jugesh-pawase-7919972a7",
      description:
        "Data scientist focused on data preprocessing and feature engineering. Analyzed the student dataset to identify key factors affecting placement outcomes and improved model accuracy.",
    },
    {
      name: "Pravin Zanjure",
      image: PravinZanjure,
      github: "https://github.com/Pravinzanjure26",
      linkedin: "https://www.linkedin.com/in/pravin-zanjure-6326ba2a6",
      description:
        "UI/UX designer with an eye for detail and user-centered design. Created the visual identity of our application and designed intuitive user flows to enhance the overall experience.",
    },
  ];

  const openMemberCard = (index) => {
    setSelectedMember(teamMembers[index]);
  };

  const closeMemberCard = () => {
    setSelectedMember(null);
  };

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
            Our model is trained on historical student data and uses multiple
            machine learning algorithms to provide accurate predictions that can
            help students understand their strengths and areas for improvement.
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Meet Our Team
        </h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-full w-48 h-48 sm:w-64 sm:h-64 flex flex-col items-center justify-center shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              style={{
                background: "linear-gradient(to bottom, #ffffff, #f0f9ff)",
                border: "1px solid #e5e7eb",
              }}
              onClick={() => openMemberCard(index)}
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
              <div className="flex space-x-3 mt-3 sm:mt-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub size={16} className="sm:text-xl" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaLinkedin size={16} className="sm:text-xl" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Member Card */}
        {selectedMember && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeMemberCard}
          >
            <div
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all duration-500 animate-card-appear"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  onClick={closeMemberCard}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100 shadow-md animate-profile-appear">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 animate-text-appear">
                  {selectedMember.name}
                </h2>

                <div className="flex space-x-4 mb-4 animate-icons-appear">
                  <a
                    href={selectedMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition-colors transform hover:scale-110"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors transform hover:scale-110"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>

                <div className="text-gray-700 text-center animate-description-appear">
                  <p>{selectedMember.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

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

      {/* Add animation styles */}
      <style>{`
        @keyframes cardAppear {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes profileAppear {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes textAppear {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes iconsAppear {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes descriptionAppear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        .animate-card-appear {
          animation: cardAppear 0.3s ease-out forwards;
        }
        
        .animate-profile-appear {
          animation: profileAppear 0.4s ease-out 0.1s both;
        }
        
        .animate-text-appear {
          animation: textAppear 0.4s ease-out 0.2s both;
        }
        
        .animate-icons-appear {
          animation: iconsAppear 0.4s ease-out 0.3s both;
        }
        
        .animate-description-appear {
          animation: descriptionAppear 0.5s ease-out 0.4s both;
        }
      `}</style>
    </div>
  );
};

export default About;
