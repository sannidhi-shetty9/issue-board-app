import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;          // Applies to the <input>
  cntClass?: string;           // Applies to the wrapper <div>
  left?: React.ReactNode;      // Left slot/component
  right?: React.ReactNode;     // Right slot/component
  CustomInput?: React.ElementType; // Custom input component
}

const Input = ({
  className = '',
  cntClass = '',
  left,
  right,
  CustomInput='input',
  ...inputProps
}: InputProps) => {
  return (
    <div className={`relative ${cntClass}`}>
      {left}
      <CustomInput
        className={`${className}`}
        {...inputProps}
      />
      {right}
    </div>
  );
};

export default Input;
