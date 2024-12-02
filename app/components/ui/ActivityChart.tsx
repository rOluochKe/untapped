/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface CustomerActivity {
  day: string;
  location: string;
  activity: number;
}

const ActivityChart = () => {
  const { data, isLoading, error } = useCustomerActivity();

  const [currentPoint, setCurrentPoint] = React.useState<CustomerActivity | null>(null);

  const dayToNumber = (day: string) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return days.indexOf(day);
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <Box>Error loading activity data</Box>;

  const dataForChart =
    data?.map((entry: CustomerActivity) => ({
      x: dayToNumber(entry.day),
      y: entry.activity,
      location: entry.location,
      day: entry.day,
    })) || [];

  return (
    <Box width="100%" mt={4}>
      <Heading size="sm" color="gray.600" mb={4}>
        Interactive Data Insights
      </Heading>
      <ResponsiveContainer width="100%" height={400} style={{ padding: 10 }}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          onMouseMove={(e: any) => {
            if (e?.activePayload?.length > 0) {
              console.log("Hovered data:", e.activePayload);
              setCurrentPoint(e.activePayload[0].payload); 
            } else {
              setCurrentPoint(null); 
            }
          }}
          onMouseLeave={() => setCurrentPoint(null)}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            domain={[-0.5, 4.5]}
            ticks={[0, 1, 2, 3, 4]}
            tickFormatter={(tick) => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][tick]}
            label={{ value: "Day of the Week", position: "bottom", offset: -10 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            label={{ value: "Customer Activity", angle: -90, position: "left" }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={({ active, payload }: any) => {
              if (active && payload?.length) {
                const { day, location, activity } = payload[0].payload;
                return (
                  <Box
                    p={3}
                    bg="white"
                    border="1px solid #ccc"
                    borderRadius="md"
                    boxShadow="md"
                    textAlign="center"
                  >
                    <Text fontWeight="bold">{`Location: ${location}`}</Text>
                    <Text>{`Day: ${day}`}</Text>
                    <Text>{`Activity: ${activity}`}</Text>
                  </Box>
                );
              }
              return null;
            }}
          />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ marginBottom: -20 }} />
          <Scatter
            name="Customer Activity"
            data={dataForChart}
            fill="#8884d8"
            line={{ stroke: "#8884d8", strokeWidth: 1 }}
            radius={(entry) => Math.sqrt(entry.y)}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {currentPoint && (
        <Box mt={4} p={4} border="1px solid #ccc" borderRadius="md" backgroundColor="gray.50">
          <Text fontWeight="bold">Current Point Data:</Text>
          <Text>{`Day: ${currentPoint.day}`}</Text>
          <Text>{`Location: ${currentPoint.location}`}</Text>
          <Text>{`Activity: ${currentPoint.activity}`}</Text>
        </Box>
      )}
    </Box>
  );
};

export default ActivityChart;
