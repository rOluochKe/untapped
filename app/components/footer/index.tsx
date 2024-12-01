import { Box, Flex, Text } from "@chakra-ui/react";
import { useAppColorMode } from '../ChakraUIProvider';

const Footer = () => {
  const { colorMode } = useAppColorMode();

  return (
    <Box
      as="footer"
      p={4}
      bg={colorMode === "dark" ? "gray.800" : "white"}
      color={colorMode === "dark" ? "white" : "gray.800"}
    >
      <Flex justify="center" align="center">
        <Text fontSize="sm">
          &copy; 2024 Untapped Global. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
