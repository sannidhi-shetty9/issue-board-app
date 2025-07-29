import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Issue, PartialIssue } from "../../types";
import { mockFetchIssues } from "../../utils/api";
import { getLocalStorage, setLocalStorage } from "../../utils/storage";

const maxRecentAccessedIssues = 2;
const recentAccessedIssuesStoreageName = "recentAccessedIssues";

type SeveritiesType = {
  [key: number | string]: boolean;
};

type AssigneesType = {
  [key: string]: boolean;
};

export interface IssueContextProps {
  issues: Issue[];
  syncTime: Date | null;
  severities: SeveritiesType;
  assignees: AssigneesType;
  recentAccessedIssues: Issue[];
  getIssue: (id: string) => Issue | null;
  updateIssue: (id: string, updatedIssue: PartialIssue) => void;
  searchIssues: (str: string) => Issue[];
  updateSeverities: (newSeverities: SeveritiesType) => void;
  updateAssignees: (newAssignees: AssigneesType) => void;
  addRecentAccesedIssue: (issue: Issue) => void;
  startPolling: () => void;
  stopPolling: () => void;
  isPolling: boolean;
}

const getDaysSinceCreated = (createdAt: string): number => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffTime = now.getTime() - createdDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
};

const sortIssue = (a: Issue, b: Issue) => {
  {
    const daysA = getDaysSinceCreated(a.createdAt);
    const daysB = getDaysSinceCreated(b.createdAt);

    // const rankA = a.userDefinedRank ?? 0;
    // const rankB = b.userDefinedRank ?? 0;

    const rankA = 0;
    const rankB = 0;

    const scoreA = a.severity * 10 + daysA * -1 + rankA;
    const scoreB = b.severity * 10 + daysB * -1 + rankB;

    if (scoreA !== scoreB) {
      return scoreB - scoreA; // Descending score
    }

    // If scores are equal, sort by most recent `createdAt`
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }
};

const IssueContext = createContext<IssueContextProps>({
  issues: [],
  syncTime: null,
  severities: {},
  assignees: {},
  recentAccessedIssues: [],
  getIssue: () => null,
  updateIssue: () => {},
  searchIssues: () => [],
  updateSeverities: () => {},
  updateAssignees: () => {},
  addRecentAccesedIssue: () => {},
  startPolling: () => {},
  stopPolling: () => {},
  isPolling: false,
});

export const useIssue = () => useContext(IssueContext);

export const IssueProvider = ({ children }: { children: React.ReactNode }) => {
  const issuesRef = useRef<Issue[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [severities, setSeverities] = useState<SeveritiesType>({
    1: true,
    2: true,
    3: true,
  });
  const severitiesRef = useRef(severities);
  const [assignees, setAssignees] = useState<AssigneesType>({
    alice: true,
    bob: true,
    carol: true,
  });
  const assigneesRef = useRef(assignees);
  const [recentAccessedIssues, setRecentAccessedIssues] = useState<Issue[]>([]);
  const [syncTime, setSyncTime] = useState<Date | null>(null);
  const syncRef = useRef<number>(undefined);
  const [isPolling, setIsPolling] = useState(false)

  const fetchAndSetIssues = useCallback(() => {
    mockFetchIssues().then((res) => {
      const sortedIssues = [...(res as Issue[])].sort(sortIssue);
      issuesRef.current = sortedIssues;
      const filteredIssues = sortedIssues.filter((issue) => {
        return (
          severitiesRef.current[issue.severity] &&
          assigneesRef.current[issue.assignee]
        );
      });
      setIssues(filteredIssues);
      setSyncTime(new Date());
      // console.log("fetch and set issue:", new Date());
    });
  }, [severitiesRef, assigneesRef]);

  useEffect(() => {
    const storedRecent =
      getLocalStorage<Issue[]>(recentAccessedIssuesStoreageName) || [];
    setRecentAccessedIssues(storedRecent);
  }, []);

  useEffect(() => {
    severitiesRef.current = severities;
  }, [severities]);

  useEffect(() => {
    assigneesRef.current = assignees;
  }, [assignees]);

  useEffect(() => {
    fetchAndSetIssues();
    // Cleanup on unmount
    return () => clearInterval(syncRef.current);
  }, []);

  useEffect(() => {
    const newIssues = issuesRef.current.filter((issue) => {
      return severities[issue.severity] && assignees[issue.assignee];
    });
    setIssues(newIssues);
  }, [severities, assignees]);

  const startPolling = () => {
    clearInterval(syncRef.current);
    // Start polling every 10 seconds
    syncRef.current = setInterval(fetchAndSetIssues, 10000);
    setIsPolling(true)
  };

  const stopPolling = () => {
    clearInterval(syncRef.current);
    setIsPolling(false)
  };

  const getIssue = (id: string) => {
    return issues.find((issue) => issue.id === id) || null;
  };

  const updateIssue = (id: string, updatedIssue: PartialIssue) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === id ? { ...issue, ...updatedIssue } : issue
      )
    );
  };

  const searchIssues = (str: string) => {
    return issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(str.toLowerCase()) ||
        issue.tags.some((tag) => tag.toLowerCase().includes(str.toLowerCase()))
    );
  };

  const updateSeverities = (newSeverities: SeveritiesType) => {
    setSeverities(newSeverities);
  };

  const updateAssignees = (newAssignees: AssigneesType) => {
    setAssignees(newAssignees);
  };

  const addRecentAccesedIssue = (issue: Issue) => {
    // if(issue.id === recentAccessedIssues[0]?.id) return;
    setRecentAccessedIssues((prev) => {
      if (issue.id === prev[0]?.id) {
        return prev;
      }

      const updatedIssues = [
        issue,
        ...prev.filter((item) => issue.id !== item.id),
      ].slice(0, maxRecentAccessedIssues);
      setLocalStorage<Issue[]>(recentAccessedIssuesStoreageName, updatedIssues);
      return updatedIssues;
    });
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        syncTime,
        severities,
        assignees,
        recentAccessedIssues,
        getIssue,
        updateIssue,
        searchIssues,
        updateSeverities,
        updateAssignees,
        addRecentAccesedIssue,
        startPolling,
        stopPolling,
        isPolling
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};
