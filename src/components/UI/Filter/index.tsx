import { ChevronDown } from "lucide-react";
import Dropdown, { type DropdownRef } from "../DropDown";
import { useRef, type ReactNode } from "react";

export interface FilterProps<T> {
  label?: string;
  options?: T[];
  renderOption?: (option: T) => ReactNode;
  onClick?: (option: T, index: number) => T;
  renderKey?: (option: T) => string;
}

// export interface FilterProps{
//   label?: string;
//   options?: string[];
//   selected?: string[];
// //   renderOption?: (option: T) => string;
//   onClick?: (option: string, index: number) => void;
  
// }

export default function Filter<T>({
  label = "",
  options = [],
  renderOption = () => "",
  renderKey,
}: FilterProps<T>) {

  const dropdownRef = useRef<DropdownRef>(null);

  const optionsElem = <div>
    {options.map((option, index) => {

        return <div key={renderKey ? renderKey(option): index}>
            {renderOption(option)}
        </div>
    })}
  </div>

  return (
    <Dropdown
      ref={dropdownRef}
      label={
        <div className="flex gap-1">
          <div>{label}</div>
          <ChevronDown />
        </div>
      }
      content={optionsElem}
    />
  );
}
