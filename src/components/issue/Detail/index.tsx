import { useParams } from "react-router-dom";
import { useIssue } from "../../../contexts/IssueContext";
import Select, { type SelectHandle } from "../../UI/Select";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "../../UI/input";
import { useAuth } from "../../../contexts/AuthContext";

const allStatus = ["In Progress", "Backlog", "Done"];
const allPriorities = ["low", "medium", "high"];

export default function IssueDetail() {
  const params = useParams();
  const id = params.id as string;
  const { isAdmin } = useAuth();
  const { getIssue, updateIssue, addRecentAccesedIssue } = useIssue();
  const selectRef = useRef<SelectHandle>(null);
  const prioritySelectRef = useRef<SelectHandle>(null);
  const [tagInput, setTagInput] = useState("");

  const issue = getIssue(id);

  useEffect(() => {
    if (!issue) return;
    addRecentAccesedIssue(issue);
  }, [issue, addRecentAccesedIssue]);

  if (!issue) {
    return <div>issue not found</div>;
  }
  const date = new Date(issue?.createdAt as string);
  const status = issue?.status;
  const priority = issue?.priority;
  const otherStatus = allStatus.filter((item) => item !== status);
  const otherPriorities = allPriorities.filter((item) => item !== priority);

  const statusSelectorElem = (
    <Select
      ref={selectRef}
      value={null}
      options={otherStatus}
      closeOnSelect={true}
      renderLabel={({ selected, isOpen }) => (
        <div className="flex items-center gap-2">
          <div>{status}</div>
          <ChevronDown className={``} />
        </div>
      )}
      //   onChange={(val) => console.log(val)}
      getOptionLabel={(value, index) => (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            if (!isAdmin) return;
            selectRef.current?.close();
            issue.status = value;
            updateIssue(id, issue);
          }}
        >
          <div>{value}</div>
        </div>
      )}
      getOptionValue={(o) => o.value}
      dropdownClass="bg-white dark:bg-gray-950 shadow-md dark:shadow-md min-w-full mt-1 rounded-md"
      openDropdownClass="p-1"
      labelClass="bg-white dark:bg-gray-900 shadow-md dark:shadow-md rounded-md p-1 cursor-pointer"
    />
  );

  const prioritySelectorElem = (
    <Select
      ref={prioritySelectRef}
      value={null}
      options={otherPriorities}
      closeOnSelect={true}
      renderLabel={() => (
        <div className="flex items-center gap-2">
          <div>{priority}</div>
          <ChevronDown className={``} />
        </div>
      )}
      //   onChange={(val) => console.log(val)}
      getOptionLabel={(value) => (
        <div
          className="flex items-center gap-1 cursor-pointer px-1 w-full"
          onClick={() => {
            if (!isAdmin) return;
            prioritySelectRef.current?.close();
            issue.priority = value;
            updateIssue(id, issue);
          }}
        >
          <div>{value}</div>
        </div>
      )}
      getOptionValue={(o) => o.value}
      dropdownClass="bg-white dark:bg-gray-950 shadow-md dark:shadow-md min-w-full mt-1 rounded-md"
      openDropdownClass="p-1"
      labelClass="bg-white dark:bg-gray-900 shadow-md dark:shadow-md rounded-md p-1 cursor-pointer"
    />
  );

  const tagsElem = (
    <div className="flex items-center gap-2">
      <div>Tags:</div>
      <div className="flex items-center gap-2">
        {issue.tags.map((tag, index) => {
          return (
            <div
              key={tag + index}
              className="bg-white dark:bg-gray-900 shadow-md dark:shadow-md flex items-center gap-1 rounded-md p-1 "
            >
              <div>{tag}</div>
              {isAdmin && (
                <X
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    issue.tags.splice(index, 1);
                    updateIssue(id, issue);
                  }}
                />
              )}
            </div>
          );
        })}
        {isAdmin && (
          <Input
            value={tagInput}
            placeholder="Add tag"
            className="border-none outline-none"
            onChange={(e) => {
              const val = e.target.value;
              setTagInput(val);
            }}
            onKeyDown={(e) => {
              // const val = e.target.val;
              if (e.key === "Enter" && tagInput) {
                setTagInput("");
                issue.tags.push(tagInput);
                updateIssue(id, issue);
              }
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="px-2 py-10 flex flex-col gap-10">
      <div className="flex gap-10 items-center">
        <h2 className="text-2xl font-bold"> {issue?.title}</h2>
      </div>
      <div className="flex gap-10 items-center">
        <div>Assignee: {issue?.assignee}</div>
        <div>Date: {date.toLocaleDateString()}</div>
      </div>
      {tagsElem}
      <div className="flex gap-10 items-center">
        <div className="flex gap-5 items-center">
          <div>Status:</div>
          {statusSelectorElem}
        </div>
        <div className="flex gap-5 items-center">
          <div>Priority:</div>
          {prioritySelectorElem}
        </div>
      </div>
      <div className="flex">
        {isAdmin && <button
          onClick={() => {
            issue.status = "Done";
            updateIssue(id, issue);
          }}
          className="bg-white dark:bg-gray-900 shadow-md dark:shadow-md border border-gray-200 dark:border-gray-500  rounded-md px-2 py-2 cursor-pointer"
        >
          Mark as done
        </button> }
      </div>
    </div>
  );
}
