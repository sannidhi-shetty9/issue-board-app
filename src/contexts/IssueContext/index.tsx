import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Issue, PartialIssue } from "../../types";
import { mockFetchIssues } from "../../utils/api";

const maxRecentAccessedIssues = 2;

type SeveritiesType = {
  [key: number | string]: boolean;
};

type AssigneesType = {
  [key: string]: boolean;
};

export interface IssueContextProps {
  issues: Issue[];
  severities: SeveritiesType;
  assignees: AssigneesType;
  recentAccessedIssues: Issue[];
  getIssue: (id: string) => Issue | null;
  updateIssue: (id: string, updatedIssue: PartialIssue) => void;
  searchIssues: (str: string) => Issue[];
  updateSeverities: (newSeverities: SeveritiesType) => void;
  updateAssignees: (newAssignees: AssigneesType) => void;
  addRecentAccesedIssue: (issue: Issue) => void;
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

    const rankA = a.userDefinedRank ?? 0;
    const rankB = b.userDefinedRank ?? 0;

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
  severities: {},
  assignees: {},
  recentAccessedIssues: [],
  getIssue: () => null,
  updateIssue: () => {},
  searchIssues: () => [],
  updateSeverities: () => {},
  updateAssignees: () => {},
  addRecentAccesedIssue: () => {},
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
  const [assignees, setAssignees] = useState<AssigneesType>({
    alice: true,
    bob: true,
    carol: true,
  });
  const [recentAccessedIssues, setRecentAccessedIssues] = useState<Issue[]>([]);

  useEffect(() => {
    mockFetchIssues().then((res) => {
      const sortedIssues = [...(res as Issue[])].sort(sortIssue);
      issuesRef.current = sortedIssues;
      setIssues(sortedIssues);
    });
  }, []);

  useEffect(() => {
    const newIssues = issuesRef.current.filter((issue, index) => {
      return severities[issue.severity] && assignees[issue.assignee];
    });
    setIssues(newIssues);
  }, [severities, assignees]);

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
      return updatedIssues;
    });
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        severities,
        assignees,
        recentAccessedIssues,
        getIssue,
        updateIssue,
        searchIssues,
        updateSeverities,
        updateAssignees,
        addRecentAccesedIssue,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};
