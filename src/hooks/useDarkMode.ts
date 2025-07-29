// src/hooks/useDarkMode.ts
import { useEffect, useState } from 'react';

export default function useDarkMode(): {isDark: boolean, toggleDarkMode: () => void, setDarkMode: (state: boolean) => void} {
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(html.classList.contains('dark'));
  };

  const setDarkMode = (state: boolean) => {
    const html = document.documentElement;
    html.classList?.[state ? 'add' : 'remove']('dark');
    setIsDark(html.classList.contains('dark'));
  };

  useEffect(() => {
    // Optional: Load from localStorage
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return {isDark, toggleDarkMode, setDarkMode};
}
