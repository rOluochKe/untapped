import { Box, SystemProps } from "@chakra-ui/react";

interface ContentProps {
  children: React.ReactNode;
  width?: string | { base: string; md: string };
  padding?: string; 
  overflow?: SystemProps["overflowY"]; 
  display?: SystemProps["display"];
}

const Content = ({ children, width, padding, overflow, display }: ContentProps) => {
  return (
    <Box
      as="main"
      flex="1"
      p={padding || 3} 
      bg="gray.100"
      overflowY={overflow || "auto"} 
      width={width || "100%"} 
      display={display} 
    >
      {children}
    </Box>
  );
};

export default Content;
