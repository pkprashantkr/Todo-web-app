import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { Moon, Sun } from "lucide-react";
import logowhite from "./assets/white-logo.png";
import logoblack from "./assets/black-logo.png";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply the dark mode class to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`h-screen selection:bg-orange-200 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center p-4 mb-4">
        <a href="/">
          <img
            src={darkMode ? logowhite : logoblack}
            alt="logo"
            className="w-36 h-6 pl-2"
          />
        </a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`border-none rounded-full w-auto p-2 cursor-pointer ${
            darkMode
              ? "bg-gray-600 text-white hover:bg-gray-500"
              : "bg-gray-200 text-black hover:bg-gray-100"
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Todo Component */}
      <div className="grid py-4">
        <Todo darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
