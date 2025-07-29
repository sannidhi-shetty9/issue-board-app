import { RefreshCw, RefreshCwOff } from "lucide-react";
import { useIssue } from "../../contexts/IssueContext";
import { useToast } from "../../contexts/ToastContext";

export default function IssuePollingToggle() {
  const { showToast } = useToast();
  const { startPolling, stopPolling, isPolling } = useIssue();

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md dark:shadow-md dark:text-white cursor-pointer flex items-center gap-2  rounded-2xl p-1">
      {/* {isDark ? <Sun onClick={toggleDarkMode} /> : <Moon onClick={toggleDarkMode}/>} */}
      <div className={`${isPolling ? "" : ""}`}>
        <RefreshCwOff
        size={24}
          className={`${isPolling ? "text-gray-400" : ""}`}
          onClick={() => {
            stopPolling();
            showToast({
              message: <div className="">Issues polling Disabled</div>,
              timeout: 3000,
              className: 'px-4 py-4 shadow-md dark:shadow-md rounded dark:shadow-md dark:border dark:border-gray-700'
            });
          }}
        />
      </div>
      <div className={`${isPolling ? "" : ""}`}>
        <RefreshCw
        size={24}
          className={`${isPolling ? "" : "text-gray-400"}`}
          onClick={() => {
            startPolling();
            showToast({
              message: <div className="">Issues polling Enabled</div>,
              timeout: 3000,
              className: 'px-4 py-4 shadow-md dark:shadow-md rounded dark:shadow-md dark:border dark:border-gray-700'
            });
          }}
        />
      </div>
    </div>
  );
}
