import { Box, Text, Stat, StatNumber, StatHelpText, StatArrow } from "@chakra-ui/react";
import { useAppColorMode } from "../ChakraUIProvider";

interface KPICardProps {
  label: string;
  value: number; 
  isPositive: boolean;
  isCurrency: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, isPositive, isCurrency = true }) => {
  const { colorMode } = useAppColorMode();

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p={4}
      boxShadow="md"
      bg={colorMode === "dark" ? "gray.700" : "white"}
    >
      <Text fontSize="lg" fontWeight="semibold" mb={2} color={colorMode === "dark" ? "gray.300" : "gray.600"}>
        {label}
      </Text>
      <Stat>
        <StatNumber fontSize="2xl" color={isPositive ? "green.500" : "red.500"}>
          {isCurrency ? `$${value.toFixed(2)}` : value}
        </StatNumber>
        <StatHelpText color={isPositive ? "green.300" : "red.300"}>
          <StatArrow type={isPositive ? "increase" : "decrease"} />
          {isPositive ? "Good performance" : "Needs attention"}
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default KPICard;
