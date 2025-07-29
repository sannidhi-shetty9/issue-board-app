import { Moon, Sun } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";

export default function ThemeToggle() {
  const {isDark, setDarkMode } = useDarkMode();

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md dark:shadow-md dark:text-white cursor-pointer flex items-center gap-2 rounded-2xl p-1">
      {/* {isDark ? <Sun onClick={toggleDarkMode} /> : <Moon onClick={toggleDarkMode}/>} */}
      <div className={`${isDark ? '' : ''}`}>
        <Sun  className={`${isDark ? 'text-gray-400' : ''}`} onClick={() => setDarkMode(false)} />
      </div>
      <div className={`${isDark ? '' : ''}`}>
        <Moon  className={`${isDark ? '' : 'text-gray-400'}`} onClick={() => setDarkMode(true)} />
      </div>
    </div>
  );
}
