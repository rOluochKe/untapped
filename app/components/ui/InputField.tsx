import React from "react";
import { Input } from "@chakra-ui/react";
import { useAppColorMode } from "../ChakraUIProvider";

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
  const { colorMode } = useAppColorMode();

  return (
    <Input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width={width}
      border="1px"
      borderColor={colorMode === "light" ? borderColor : "gray.600"}
      bg={colorMode === "light" ? "white" : "gray.700"}
      color={colorMode === "light" ? "black" : "white"}
      _placeholder={{
        color: colorMode === "light" ? "gray.500" : "gray.300",
      }}
      _focus={{
        borderColor: colorMode === "light" ? "blue.400" : "blue.300",
        boxShadow: `0 0 0 1px ${
          colorMode === "light" ? "blue.400" : "blue.300"
        }`,
      }}
    />
  );
};

export default InputField;
