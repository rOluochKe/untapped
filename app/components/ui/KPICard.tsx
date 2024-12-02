import { Box, Text, Stat, StatNumber, StatHelpText, StatArrow } from "@chakra-ui/react";

interface KPICardProps {
  label: string;
  value: { value: number; date: string }[];
  isPositive: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, isPositive }) => {
  const latestValue = value && value.length > 0 ? value[0]?.value : 0;

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p={4}
      boxShadow="md"
      bg="white"
    >
      <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray.600">
        {label}
      </Text>
      <Stat>
        <StatNumber fontSize="2xl" color={isPositive ? "green.500" : "red.500"}>
          ${latestValue.toFixed(2)} 
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
