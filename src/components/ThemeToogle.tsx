import { Moon, Sun } from "lucide-react"
import useDarkMode from "../hooks/useDarkMode"

export default function ThemeToggle() {

    const [isDark, toggleDarkMode] = useDarkMode()

    return <div className=" dark:text-white cursor-pointer">
        {isDark ? <Sun onClick={toggleDarkMode} /> : <Moon onClick={toggleDarkMode}/>}
    </div>
}