import { NavLink, Outlet } from "react-router-dom";
import { ToastProvider } from "../contexts/ToastContext";
import { IssueProvider } from "../contexts/IssueContext";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <AuthProvider>
    <IssueProvider>
    <ToastProvider>
    <div className="w-screen h-screen bg-gray-100 text-black  dark:bg-gray-950 dark:text-white flex flex-col overflow-y-auto">
     <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
    </ToastProvider>
    </IssueProvider>
    </AuthProvider>
  );
}
