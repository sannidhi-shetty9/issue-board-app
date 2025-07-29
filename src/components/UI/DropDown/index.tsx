import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  forwardRef,
  type Ref,
  useImperativeHandle,
} from "react";

interface DropdownProps {
  label: ReactNode;
  content?: ReactNode;
  options?: (string | ReactNode)[];
  onClick?: () => void;
  onSelect?: (option: string | ReactNode, index?: number) => void;
  onOpenChange?: (open: boolean) => void;
  trigger?: "click" | "hover" | "options";
  className?: string;
  activeClass?: string;
  dropdownSpeed?: number;
  labelClass?: string;
  dropdownClass?: string;
  optionClass?: string;
  openLabelClass?: string;
  openDropdownClass?: string;
}

export interface DropdownRef {
  openDropdown: () => void;
  closeDropdown: () => void;
  setDropdown: (value: boolean) => void;
}

const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  (
    {
      label,
      content = null,
      options = [],
      onClick = () => {},
      onSelect = () => {},
      onOpenChange,
      trigger = "click",
      className = "",
      activeClass = "",
      dropdownSpeed = 200,
      labelClass = "",
      dropdownClass = "",
      optionClass = "",
      openLabelClass = "",
      openDropdownClass = "",
    }: DropdownProps,
    ref: Ref<DropdownRef>
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [shouldRender, setShouldRender] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);
    const [height, setHeight] = useState("0px");

    // imperative handle to expose methods to parents
    useImperativeHandle(ref, () => ({
      openDropdown: () => updateOpen(true),
      closeDropdown: () => updateOpen(false),
      setDropdown: (value: boolean) => updateOpen(value),
    }));

    const updateOpen = (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);

      // if (open) {
      //   setShouldRender(true);
      // } else {
      //   setTimeout(() => setShouldRender(false), dropdownSpeed);
      // }
    };

    const toggleDropdown = () => updateOpen(!isOpen);

    const openDropdown = () => {
      if (trigger === "hover") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        updateOpen(true);
      }
    };

    const closeDropdown = () => {
      if (trigger === "hover") {
        timeoutRef.current = setTimeout(() => updateOpen(false), 200);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        updateOpen(false);
      }
    };

    useEffect(() => {
      if (trigger === "click") {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [trigger]);

    useEffect(() => {
      if (trigger === "options") {
        updateOpen(options.length ? true : false);
      }
    }, [trigger, options]);

    useEffect(() => {
      if (contentRef.current) {
        setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
      }
    }, [isOpen, options]);

    const dropdownStyle: React.CSSProperties = {
      height,
      transition: `height ${dropdownSpeed}ms ease`,
    };

    if (!isOpen) {
      Object.assign(dropdownStyle, { border: "0px" });
    }

    return (
      <div
        className={`relative inline-block ${className}`}
        ref={dropdownRef}
        onMouseEnter={trigger === "hover" ? openDropdown : undefined}
        onMouseLeave={trigger === "hover" ? closeDropdown : undefined}
      >
        <button
          onClick={() => {
            if (trigger === "click") toggleDropdown();
            onClick();
          }}
          className={`${labelClass} ${
            isOpen ? `${activeClass} ${openLabelClass}` : ""
          }`}
        >
          {label}
        </button>

        <div
          ref={contentRef}
          className={`
          absolute top-full left-0 overflow-hidden transition-all
          ${dropdownClass}
          ${isOpen ? openDropdownClass : ""}
        `}
          // className={`
          //     absolute top-full left-0 overflow-hidden bg-white
          //   `}
          style={dropdownStyle}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          {content}
          {/* {shouldRender && ( */}
          {options && (
            <ul className="m-0 p-0">
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    className={optionClass}
                    onClick={() => {
                      // updateOpen(false);
                      onSelect(option, index);
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

export default Dropdown;
