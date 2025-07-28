import { useMemo, type ReactNode } from "react";
import type { Issue, PartialIssue } from "../../types";
import { Drag, Drop } from "../UI/DragAndDrop";
import { useToast } from "../../contexts/ToastContext";
import { useIssue } from "../../contexts/IssueContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface IssueProps {
  //   issues: Issue[];
  //   update: (id: string, issue: PartialIssue) => {};
}

export default function Issues({}: IssueProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAdmin } = useAuth();
  const { issues, updateIssue } = useIssue();

  const groupedIssues = useMemo(() => {
    return {
      backlog: issues.filter((issue) => issue.status === "Backlog"),
      inProgress: issues.filter((issue) => issue.status === "In Progress"),
      done: issues.filter((issue) => issue.status === "Done"),
    };
  }, [issues]);

  // type ColumnName = keyof typeof groupedIssues;

  const columns: { name: "backlog" | "inProgress" | "done"; label: string }[] =
    [
      {
        name: "backlog",
        label: "Backlog",
      },
      {
        name: "inProgress",
        label: "In Progress",
      },
      {
        name: "done",
        label: "Done",
      },
    ];

  const columnElem = (
    <div className="flex gap-2">
      <table
        className="border border-collapse h-full w-full"
        // style={{ height: "100%" }}
      >
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border p-2 text-xl">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="h-full w-full"
          //   style={{ height: "100%" }}
        >
          <tr
            className="h-full w-full"
            // style={{ height: "100%" }}
          >
            {columns.map((column, index) => {
              return (
                <td
                  key={index}
                  className="border p-2 align-top h-full w-full "
                  //   style={{ height: "100%", verticalAlign: "top" }}
                >
                  <Column
                    className="min-w-[300px] min-h-[600px] h-full w-full flex flex-col gap-2 p-2"
                    onDrop={(issue) => {
                      const id = issue.id;
                      const prevStatus = issue.status;
                      if (prevStatus === column.label) return;
                      updateIssue(id, { status: column.label });
                      showToast({
                        message: <div className="">Undo</div>,
                        timeout: 5000,
                        className: "px-10 py-5 border rounded",
                        onClick: (_, close) => {
                          updateIssue(id, { status: prevStatus });
                          close();
                        },
                      });
                    }}
                  >
                    {groupedIssues[column.name].map((issue, index) => {
                      return (
                        <IssueBox
                          draggable={isAdmin}
                          key={index}
                          issue={issue}
                          onClick={() => {
                            navigate(`/issue/${issue.id}`);
                          }}
                        />
                      );
                    })}
                  </Column>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );

  return <div className="flex">{columnElem}</div>;
}

function Column({
  children = null,
  className = "",
  onDrop = () => {},
}: {
  children: ReactNode;
  className: string;
  onDrop?: (data: Issue) => void;
}) {
  return (
    <Drop
      className={` ${className}`}
      onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData("application/json"));
        onDrop(data);
      }}
    >
      {children}
    </Drop>
  );
}

function IssueBox({
  issue,
  draggable = true,
  className = "border p-2",
  onClick = () => {},
}: {
  issue: Issue;
  draggable?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Drag
      draggable={draggable}
      className={`cursor-pointer ${className}`}
      onDragStart={(e) => {
        // e.dataTransfer.setData("text/plain", issue.id);
        e.dataTransfer.setData("application/json", JSON.stringify(issue));
      }}
      onClick={onClick}
    >
      <div>
        <div>{issue.title}</div>
      </div>
    </Drag>
  );
}
