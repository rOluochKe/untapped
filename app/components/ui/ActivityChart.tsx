import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Text } from "@chakra-ui/react";
import { useCustomerActivity } from "@/app/utils/hooks";
import { Loader, Heading } from "./index";
import { useAppColorMode } from "../ChakraUIProvider";

interface CustomerActivity {
  day: string;
  location: string;
  activity: number;
}

const ActivityChart = () => {
  const { data, isLoading, error } = useCustomerActivity();
  const { colorMode } = useAppColorMode();

  const [currentPoint, setCurrentPoint] = React.useState<CustomerActivity | null>(null);

  const dayToNumber = (day: string) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return days.indexOf(day);
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <Box>Error loading activity data</Box>;

  // Map data to chart-friendly format
  const dataForChart =
    data?.map((entry: CustomerActivity) => {
      const x = dayToNumber(entry.day);
      return {
        x,
        y: entry.activity,
        location: entry.location,
        day: entry.day,
      };
    }) || [];

  // Define light and dark mode colors
  const isDarkMode = colorMode === "dark";
  const backgroundColor = isDarkMode ? "gray.700" : "white";
  const borderColor = isDarkMode ? "gray.500" : "#ccc";
  const textColor = isDarkMode ? "white" : "black";
  const gridColor = isDarkMode ? "gray.600" : "gray.300";
  const scatterFill = isDarkMode ? "#82ca9d" : "#8884d8";
  const scatterStroke = scatterFill;

  return (
    <Box width="100%" mt={4} px={{ base: 2, md: 4 }}>
      <Heading size="sm" color={textColor} mb={4}>
        Interactive Data Insights
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          onMouseMove={(e: any) => {
            if (e?.activePayload?.length > 0) {
              setCurrentPoint(e.activePayload[0].payload);
            } else {
              setCurrentPoint(null);
            }
          }}
          onMouseLeave={() => setCurrentPoint(null)}
        >
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[-0.5, 4.5]}
            ticks={[0, 1, 2, 3, 4]}
            tickFormatter={(tick) =>
              ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][tick]
            }
            label={{
              value: "Day of the Week",
              position: "bottom",
              offset: -10,
              fill: textColor,
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            label={{
              value: "Customer Activity",
              angle: -90,
              position: "left",
              fill: textColor,
            }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }: any) => {
              if (active && payload?.length) {
                const { location, day, y: activity } = payload[0].payload;
                return (
                  <Box
                    p={3}
                    bg={backgroundColor}
                    border={`1px solid ${borderColor}`}
                    borderRadius="md"
                    boxShadow="md"
                    textAlign="center"
                  >
                    <Text fontWeight="bold" color={textColor}>
                      {`Location: ${location}`}
                    </Text>
                    <Text color={textColor}>{`Day: ${day}`}</Text>
                    <Text color={textColor}>{`Activity: ${activity}`}</Text>
                  </Box>
                );
              }
              return null;
            }}
          />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ marginBottom: -20 }}
          />
          <Scatter
            name="Customer Activity"
            data={dataForChart}
            fill={scatterFill}
            line={{ stroke: scatterStroke, strokeWidth: 1 }}
            radius={(entry) => Math.sqrt(entry.y)}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {currentPoint && (
        <Box
          mt={4}
          p={4}
          border={`1px solid ${borderColor}`}
          borderRadius="md"
          backgroundColor={backgroundColor}
        >
          <Text fontWeight="bold" color={textColor}>
            Current Point Data:
          </Text>
          <Text color={textColor}>{`Day: ${currentPoint.day}`}</Text>
          <Text color={textColor}>{`Location: ${currentPoint.location}`}</Text>
          <Text color={textColor}>{`Activity: ${currentPoint.activity}`}</Text>
        </Box>
      )}
    </Box>
  );
};

export default ActivityChart;
