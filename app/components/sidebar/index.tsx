import { Box, VStack, Text, SystemProps, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaTachometerAlt, FaShoppingCart, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { useAppColorMode } from '../ChakraUIProvider';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string | { base: string; md: string };
  display?: string | { base: string; md: string };
  position?: SystemProps["position"];
  transition?: SystemProps["transition"];
}

const Sidebar = ({ isOpen, display, position }: SidebarProps) => {
  const { colorMode } = useAppColorMode(); 

  const navLinks = [
    { href: "/dashboard/overview", label: "Overview", icon: FaTachometerAlt },
    { href: "/dashboard/sales", label: "Sales", icon: FaShoppingCart },
    { href: "/dashboard/expenses", label: "Expenses", icon: FaMoneyBillWave },
    { href: "/dashboard/engagement", label: "Engagement", icon: FaChartLine },
    { href: "/dashboard/transactions", label: "Transactions", icon: GrTransaction },
  ];

  return (
    <Box
      as="nav"
      w={isOpen ? { sm: "45%", md: "20%", lg: "15%" } : "0%"}
      bg={colorMode === "dark" ? "gray.800" : "gray.200"}
      color={colorMode === "dark" ? "white" : "gray.800"}
      p={isOpen ? 4 : 0}
      display={display}
      position={position || "relative"}
      height="100vh"
      overflow="auto"
      transition="width 0.3s ease"
    >
      <VStack align="start" spacing={4} height="100%">
        {navLinks.map(({ href, label, icon: IconComponent }) => (
          <NextLink href={href} passHref key={href} className="w-full">
            <Text
              display="flex"
              alignItems="center"
              width="100%"
              p={3}
              borderRadius="md"
              textAlign="left"
              _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.300", cursor: "pointer" }}
              _active={{ bg: colorMode === "dark" ? "gray.600" : "gray.300" }}
            >
              <Icon as={IconComponent} mr={2} /> {label}
            </Text>
          </NextLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
