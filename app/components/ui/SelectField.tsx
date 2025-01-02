import React from "react";
import { Select } from "@chakra-ui/react";
import { useAppColorMode } from "../ChakraUIProvider";

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
  const { colorMode } = useAppColorMode();

  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      width={width}
      border="1px"
      borderColor={colorMode === "light" ? borderColor : "gray.600"}
      bg={colorMode === "light" ? "white" : "gray.700"}
      color={colorMode === "light" ? "black" : "white"}
      _focus={{
        borderColor: colorMode === "light" ? "blue.400" : "blue.300",
        boxShadow: `0 0 0 1px ${
          colorMode === "light" ? "blue.400" : "blue.300"
        }`,
      }}
    >
      {options.map((option, index) => (
        <option
          key={`${option.value}-${index}`}
          value={option.value}
          style={{
            color: colorMode === "light" ? "black" : "white",
            backgroundColor: colorMode === "light" ? "#FFFFFF" : "#2D3748",
          }}
        >
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectField;
