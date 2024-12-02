import React from "react";
import { Select } from "@chakra-ui/react";

interface SelectFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  width?: string;
  borderColor?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  value,
  onChange,
  options,
  width = "200px",
  borderColor = "gray.400",
}) => {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      width={width}
      border="1px"
      borderColor={borderColor}
      color="gray.800"
      _placeholder={{ color: "gray.600" }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} style={{ color: "gray.800", backgroundColor: "#FFFFFF" }}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectField;
