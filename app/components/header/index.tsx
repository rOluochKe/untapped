import { Box, Flex, IconButton, Switch } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { useAppColorMode } from '../ChakraUIProvider'; 

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { colorMode, toggleColorMode } = useAppColorMode(); 

  return (
    <Box
      as="header"
      p={4}
      bg={colorMode === "dark" ? "gray.800" : "white"}
      color={colorMode === "dark" ? "white" : "gray.800"}
    >
      <Flex justify="space-between" align="center">
        <Flex justify="space-between" align="center">
          <Box fontSize="xl" mr={5}>Untapped Global</Box>

          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            onClick={onToggleSidebar}
            bg={colorMode === "dark" ? "gray.800" : "white"}
            color={colorMode === "dark" ? "white" : "gray.800"}
            _hover={{
              bg: colorMode === "dark" ? "gray.700" : "gray.200",
            }}
            _active={{
              bg: colorMode === "dark" ? "gray.600" : "gray.300",
            }}
            borderRadius="md"
          />
        </Flex>

        <Flex justify="space-between" align="center">
          <Switch
            size="sm"
            mr={4}
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
          <Box>Profile</Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
