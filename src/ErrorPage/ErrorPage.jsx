import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiSad } from "react-icons/bi";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-center p-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-green-100 p-6 rounded-full shadow-md"
      >
        <BiSad className="text-green-500 text-6xl" />
      </motion.div>

      {/* Error Message */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl font-bold text-gray-800 mt-6"
      >
        Oops! Page Not Found
      </motion.h1>
      <p className="text-lg text-gray-600 mt-4">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Possible Reasons */}
      <motion.ul
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="list-disc list-inside text-left mt-6 text-gray-600 max-w-md"
      >
        <li>The URL may have been typed incorrectly.</li>
        <li>The link might be outdated or broken.</li>
      </motion.ul>

      {/* Buttons */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-center gap-4 mt-8"
      >
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary flex items-center gap-2"
        >
          <AiOutlineHome className="text-xl" />
          Go Home
        </button>
        <button
          onClick={() => navigate("/help")}
          className="btn btn-outline flex items-center gap-2"
        >
          <AiOutlineQuestionCircle className="text-xl" />
          Help Center
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
