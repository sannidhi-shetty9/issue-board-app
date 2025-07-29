import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import Dropdown, { type DropdownRef } from "../DropDown";

interface SelectProps<T> {
  options: T[];
  value: T | null;
  onChange?: (value: T) => void;
  getOptionLabel: (option: T) => React.ReactNode;
  getOptionValue: (option: T) => string | number;
  placeholder?: React.ReactNode;
  renderLabel?: (params: {
    selected: T | null;
    isOpen: boolean;
  }) => React.ReactNode;
  className?: string;
  labelClass?: string;
  openLabelClass?: string;
  dropdownClass?: string;
  openDropdownClass?: string;
  optionClass?: string;
  activeOptionClass?: string;
  closeOnSelect?: boolean;
}

export interface SelectHandle {
  focus: () => void;
  close: () => void;
  clear: () => void;
}

// Generic wrapper
function createSelectComponent<T>() {
  return forwardRef<SelectHandle, SelectProps<T>>(
    (
      {
        options,
        value,
        onChange = () => {},
        getOptionLabel,
        // getOptionValue,
        placeholder = "Select...",
        renderLabel,
        className = "",
        labelClass = "",
        openLabelClass = "",
        dropdownClass = "",
        openDropdownClass = "",
        optionClass = "",
        activeOptionClass = "",
        closeOnSelect = false,
      },
      ref
    ) => {
      const [selected, setSelected] = useState<T | null>(value);
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef<DropdownRef>(null);

      useEffect(() => {
        setSelected(value);
      }, [value]);

      const handleSelect = (_: React.ReactNode, index?: number) => {
        if (index === undefined || index < 0 || index >= options.length) return;
        const selectedOption = options[index];
        setSelected(selectedOption);
        onChange(selectedOption);
        if (closeOnSelect) {
          setIsOpen(false);
        }
      };

      const displayLabel = renderLabel
        ? renderLabel({ selected, isOpen })
        : selected
        ? getOptionLabel(selected)
        : placeholder;

      useImperativeHandle(ref, () => ({
        focus: () => setIsOpen(true),
        close: () => {
          setIsOpen(false);
          dropdownRef.current?.closeDropdown();
        },
        clear: () => {
          setSelected(null);
          onChange(null as unknown as T); // safely reset
        },
      }));

      return (
        <Dropdown
          ref={dropdownRef}
          label={displayLabel}
          options={options.map(getOptionLabel)}
          onSelect={handleSelect}
          // onOpenChange={setIsOpen}
          className={className}
          labelClass={labelClass}
          openLabelClass={openLabelClass}
          dropdownClass={dropdownClass}
          openDropdownClass={openDropdownClass}
          optionClass={optionClass}
          activeClass={activeOptionClass}
          dropdownSpeed={150}
        />
      );
    }
  );
}

// Factory usage
const Select = createSelectComponent<any>(); // fallback generic
export default Select;
