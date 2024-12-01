import { Box, Text } from "@chakra-ui/react";

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, subtitle }) => {
  return (
    <Box mb={6}>
      <Text fontSize="3xl" fontWeight="bold" color="gray.800">
        {title}
      </Text>
      {subtitle && (
        <Text fontSize="md" color="gray.600" mt={2}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
};

export default HeaderTitle;
