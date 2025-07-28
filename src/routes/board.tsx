import { useNavigate } from "react-router-dom";
import Issues from "../components/Issues";
import LeftSidebar from "../components/LeftSidebar";
import AssigneeFilter from "../components/issue/filters/AssigneeFilter";
import SeverityFilter from "../components/issue/filters/SeverityFilter";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function Board() {
 const navigate = useNavigate();
   const { user } = useAuth();
   useEffect(() => {
     if (!user) {
       navigate("/login");
     }
   }, [user, navigate]);


  const filtersElem = (
    <div className="flex items-center justify-end w-full px-10 py-4 gap-4">
      <AssigneeFilter />
      <SeverityFilter />
    </div>
  );

  return (
    <div className="flex h-full">
     <LeftSidebar />
    <div className="flex flex-col w-full items-center gap-4 py-4">
      {filtersElem}
      <Issues />
    </div>
    </div>
  );
}
