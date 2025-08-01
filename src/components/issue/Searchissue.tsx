import {
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import Search from "../UI/Search";
import { useIssue } from "../../contexts/IssueContext";
import type { Issue } from "../../types";
import { useNavigate } from "react-router-dom";

export default function SearchIssue() {
  const navigate = useNavigate();
  const { searchIssues } = useIssue();
  const [issues, setIssues] = useState<Issue[]>([]);

  const onSearch = (val: string) => {
    if (!val) {
      setIssues([]);
      return;
    }
    const res = searchIssues(val);
    setIssues(res);
  };

  return (
    <Search
      placeholder="search issues..."
      debounceTime={300}
      options={issues.map((issue, index) => (
        <div className="" key={index} data-id={issue.id}>
          {issue.title}
        </div>
      ))}
      onChange={onSearch}
      onSelect={(node: string | ReactNode) => {
        if (!isValidElement(node)) return;
        // Tell TypeScript that props includes 'data-id'
        const element = node as ReactElement<{ "data-id": string }>;
        const id = element.props["data-id"];
        navigate(`/issue/${id}`);
      }}
      dropdownClass="bg-white dark:bg-gray-950 min-w-full mt-2 shadow-md dark:shadow-md"
      openDropdownClass="p-1 rounded-md"
      className=""
      labelClass="p-2 bg-white dark:bg-gray-950 shadow-md dark:shadow-md rounded-md"
      inputClass="border-none outline-none"
    />
  );
}
