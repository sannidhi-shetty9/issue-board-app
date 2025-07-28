import { useNavigate } from "react-router-dom";
import IssueDetail from "../components/issue/Detail";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function IssuePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <IssueDetail />;
}
