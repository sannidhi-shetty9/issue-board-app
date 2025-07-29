import { useAuth } from "../../contexts/AuthContext";
import { useIssue } from "../../contexts/IssueContext";
import IssuePollingToggle from "../Buttons/PollingToggle";
import ThemeToggle from "../Buttons/ThemeToogle";

export default function Footer() {
  const { syncTime } = useIssue();
  const { user } = useAuth();

  return (
    <div className="flex px-4 py-2 bg-gray-300 dark:bg-gray-900">
      <div className="flex-1 flex items-center gap-4">
        {user && <IssuePollingToggle />}
        {syncTime && user && (
          <div>
            Issues last synced at
            {` ${syncTime?.toLocaleDateString()} ${syncTime?.toLocaleTimeString()}`}
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
