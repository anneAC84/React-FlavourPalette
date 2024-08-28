import React, { useState, useEffect } from 'react';
import './ThemeToggle.css'; // Ensure you create this CSS file

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.className = `${theme}-mode`;
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  return (
    <label className="theme-toggle-switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggle;