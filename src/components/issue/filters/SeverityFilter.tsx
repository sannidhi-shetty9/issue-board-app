import { Check, ChevronDown } from "lucide-react";
import Select from "../../UI/Select";
import { useIssue } from "../../../contexts/IssueContext";
import { useMemo } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const ALL = "Select all";

export default function SeveritiesFilter() {
  const { isAdmin } = useAuth();

  const { severities, updateSeverities } = useIssue();
  const severitiesList = useMemo(
    () => Object.entries(severities),
    [severities]
  );

  const all = useMemo(
    () => severitiesList.every((val) => val[1] === true),
    [severities]
  );

  return (
    <Select
      value={null}
      options={[[ALL, all], ...severitiesList]}
      renderLabel={({ selected, isOpen }) => (
        <div className="flex items-center gap-1">
          <div>Severities</div>
          <ChevronDown className={``} />
        </div>
      )}
      //   onChange={(val) => console.log(val)}
      getOptionLabel={([key, value], index) => (
        <div
          className="flex items-center gap-1 cursor-pointer min-w-[120px]"
          onClick={() => {
            if (!isAdmin) return;
            const newSeverities = { ...severities };
            if (key === ALL) {
              Object.keys(newSeverities).forEach((sKey) => {
                newSeverities[sKey] = !value;
              });
            } else {
              newSeverities[key] = !value;
            }
            updateSeverities(newSeverities);
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
