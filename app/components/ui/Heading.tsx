import React from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";

interface HeadingProps {
  size?: string;
  color?: string;
  mb?: number;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  size = "md",
  color = "gray.600",
  mb = 4,
  children,
}) => {
  return (
    <ChakraHeading as="h2" size={size} color={color} mb={mb}>
      {children}
    </ChakraHeading>
  );
};

export default Heading;
