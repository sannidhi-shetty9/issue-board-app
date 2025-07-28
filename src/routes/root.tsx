import { NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToogle";
import { ToastProvider } from "../contexts/ToastContext";
import { IssueProvider } from "../contexts/IssueContext";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
    <IssueProvider>
    <ToastProvider>
    <div className="w-screen h-screen bg-white text-black  dark:bg-gray-950 dark:text-white flex flex-col overflow-y-auto">
     <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="flex px-4 py-2 bg-gray-300 dark:bg-gray-900">
        <div className="flex-1"></div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
    </ToastProvider>
    </IssueProvider>
    </AuthProvider>
  );
}
