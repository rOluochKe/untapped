import { Box, Text } from "@chakra-ui/react";
import { useAppColorMode } from "../ChakraUIProvider";

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, subtitle }) => {
  const { colorMode } = useAppColorMode();
  
  return (
    <Box mb={6}>
      <Text fontSize="3xl" fontWeight="bold" color={colorMode === "dark" ? "white" : "gray.800"}>
        {title}
      </Text>
      {subtitle && (
        <Text fontSize="md" color={colorMode === "dark" ? "gray.400" : "gray.600"} mt={2}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
};

export default HeaderTitle;
