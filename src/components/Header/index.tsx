import { useNavigate } from "react-router-dom";
import SearchIssue from "../issue/Searchissue";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center  px-4 py-2 bg-gray-300 dark:bg-gray-900">
      <div className="flex-1 flex">
        <h2
          onClick={() => {
            navigate("/board");
          }}
          className="font-bold cursor-pointer"
        >
          Issue Board
        </h2>
      </div>
      <div className="flex-1 flex justify-center">
        <SearchIssue />
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        {user && <div>Hi, {user.name}</div>}
        {user && (
          <LogOut
            size={22}
            className="cursor-pointer"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          />
        )}
        {/* <nav className="flex gap-4 ">
          <NavLink
            to="/"
            className="font-bold text-gray-800 dark:text-gray-300"
          >
            Home
          </NavLink>  
        </nav> */}
      </div>
    </header>
  );
}
