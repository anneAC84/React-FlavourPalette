import React, { useState, useEffect, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import './ThemeToggle.css'

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const { user } = useContext(AuthedUserContext);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.className = `${theme}-mode`;
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  if (!user) {
    return null; 
  }

  return (
    <label className="theme-toggle-switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggle;