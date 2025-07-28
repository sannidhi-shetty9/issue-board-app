import { useNavigate } from "react-router-dom";
import { useIssue } from "../../contexts/IssueContext";

export default function RecentAccessedIssues() {
  const navigate = useNavigate();
  const { recentAccessedIssues } = useIssue();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold">Recent Issues</h1>
      <ul className="flex flex-col gap-2 pl-2">
        {recentAccessedIssues.map((issue) => {
          return (
            <li
              key={issue.id}
              onClick={() => {
                navigate(`/issue/${issue.id}`);
              }}
              className="cursor-pointer"
            >
              {issue.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
