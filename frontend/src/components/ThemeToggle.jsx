import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      <AnimatePresence mode="wait">
        {theme === "light-theme" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <FaSun
              size={28}
              className="text-yellow-500 transform transition-all 
                         hover:rotate-45 hover:scale-110"
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute"
          >
            <FaMoon
              size={28}
              className="text-indigo-600 transform transition-all 
                         hover:rotate-45 hover:scale-110"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
