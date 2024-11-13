import { useEffect, useState } from "react";

const applyTheme = (themeMode: string) => {
  if (themeMode === "dark" || (themeMode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "system";
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => applyTheme("system"));

  useEffect(() => {
    applyTheme(theme); // Apply theme on initial render
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const currentThemeLabel = theme === "dark" ? "dark" : theme === "light" ? "light" : "system";

  return (
    <div className="flex align-middle justify-end">
      <button
        onClick={toggleTheme}
        className="text-xl p-2 m-4 w-12 aspect-square rounded-full relative group"
        aria-label="Toggle Dark Mode"
      >
        {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🖥️"}
        <span
          className="absolute right-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 text-xs text-gray-400 rounded opacity-0 group-hover:opacity-100 "
          role="tooltip"
        >
          {currentThemeLabel}
        </span>
      </button>
    </div>
  );
};

export default DarkModeToggle;
