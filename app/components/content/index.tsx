import { Box, SystemProps } from "@chakra-ui/react";
import { useAppColorMode } from "../ChakraUIProvider";

interface ContentProps {
  children: React.ReactNode;
  width?: string | { base: string; md: string };
  padding?: string;
  overflow?: SystemProps["overflowY"];
  display?: SystemProps["display"];
}

const Content = ({ children, width, padding, overflow, display }: ContentProps) => {
  const { colorMode } = useAppColorMode();

  return (
    <Box
      as="main"
      flex="1"
      p={padding ?? 2}
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
      color={colorMode === "light" ? "black" : "white"}
      overflowY={overflow || "auto"}
      width={width || "100%"} 
      display={display}
    >
      {children}
    </Box>
  );
};

export default Content;
