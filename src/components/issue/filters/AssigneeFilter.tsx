import { Check, ChevronDown } from "lucide-react";
import Select from "../../UI/Select";
import { useIssue } from "../../../contexts/IssueContext";
import { useMemo } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const ALL = 'Select all'

export default function AssigneesFilter() {
      const { isAdmin } = useAuth()
    
  const { assignees, updateAssignees } = useIssue();
  const assigneesList = useMemo(() => Object.entries(assignees), [assignees]);

  const all = useMemo(
    () => assigneesList.every((val) => val[1] === true),
    [assignees]
  );

  return (
    <Select
      value={null}
      options={[[ALL, all], ...assigneesList]}
      renderLabel={({ selected, isOpen }) => (
        <div className="flex items-center gap-1">
          <div>Assignees</div>
          <ChevronDown className={``} />
        </div>
      )}
    //   onChange={(val) => console.log(val)}
      getOptionLabel={([key, value], index) => (
        <div
          className="flex items-center gap-1 cursor-pointer min-w-[120px]"
          onClick={() => {
            if(!isAdmin) return;
            const newAssignees = { ...assignees };
            if(key === ALL) {
                Object.keys(newAssignees).forEach(sKey => {
                    newAssignees[sKey] = !value
                })
            } else {
            newAssignees[key] = !value;
            }
            updateAssignees(newAssignees)
          }}
        >
          <div className="w-10">{value && <Check />}</div>
          <div>{key}</div>
        </div>
      )}
      getOptionValue={(o) => o.value}
      dropdownClass="bg-white dark:bg-gray-950 border min-w-full mt-1 rounded-md"
      openDropdownClass="p-1"
      labelClass="border rounded-md p-1 cursor-pointer"
    />
  );
}
