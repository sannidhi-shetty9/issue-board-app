import RecentAccessedIssues from "../issue/RecentAccessedIssues";

export default function LeftSidebar() {
  return (
    <div className="flex border-r h-full py-2 pl-2 pr-2 min-w-[10%]">
      <RecentAccessedIssues />
    </div>
  );
}
