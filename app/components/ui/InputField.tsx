import React from "react";
import { Input } from "@chakra-ui/react";

interface InputFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  width?: string;
  borderColor?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  onChange,
  placeholder,
  width = "250px",
  borderColor = "gray.400",
}) => {
  return (
    <Input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width={width}
      border="1px"
      borderColor={borderColor}
      color="gray.800"
      _placeholder={{ color: "gray.600" }}
    />
  );
};

export default InputField;
