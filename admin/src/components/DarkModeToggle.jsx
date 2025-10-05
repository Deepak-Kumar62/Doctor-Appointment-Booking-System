import { Moon, Sun } from "lucide-react";

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default DarkModeToggle;