import { useCallback, useEffect, useState, type ReactNode } from "react";
import Dropdown from "../DropDown";
import Input from "../input";
import { Search as SearchIcon, X } from "lucide-react";
import { debounce } from "../../../utils";

export interface SearchProps {
  value?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  debounceTime?: number;
  options?: (string | ReactNode)[];
  onSelect?: (option: string | ReactNode, index?: number) => void;
  className?: string;
  activeClass?: string;
  dropdownSpeed?: number;
  labelClass?: string;
  dropdownClass?: string;
  optionClass?: string;
  openLabelClass?: string;
  openDropdownClass?: string;
  inputClass?: string;
  inputCntClass?: string;
}

export default function Search({
  value = "",
  placeholder = "search...",
  onChange = () => {},
  onSelect = () => {},
  debounceTime = 0,
  options = [],
  className = "",
  labelClass = "",
  dropdownClass = "",
  optionClass = "",
  openLabelClass = "",
  openDropdownClass = "",
  inputClass = "",
  inputCntClass = "gap-1",
}: SearchProps) {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const debouncedOnChange = useCallback(debounce(onChange, debounceTime), [
    onChange,
    debounceTime,
  ]);

  const changeHandler = (value: string) => {
    setQuery(value);
    debouncedOnChange(value);
  };

  return (
    <Dropdown
      trigger="options"
      label={
        <Input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => changeHandler(e.target.value)}
          className={inputClass}
          cntClass={`flex ${inputCntClass}`}
          right={
            <X onClick={() => changeHandler("")} className="cursor-pointer" />
          }
        />
      }
      options={options}
      onSelect={(val) => {
        setQuery("");
        onChange('')
        onSelect(val);
        // changeHandler('')
      }}
      className={className}
      labelClass={labelClass}
      dropdownClass={dropdownClass}
      optionClass={optionClass}
      openLabelClass={openLabelClass}
      openDropdownClass={openDropdownClass}
    />
  );
}
