import React, { useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Button, Box } from "@chakra-ui/react";
import { useCustomerActivity } from "@/app/utils/hooks";

// Define types
interface CustomerActivity {
  day: string;
  location: string;
  activity: number;
}

interface HighlightedPoint {
  day: string;
  location: string;
  activity: number;
}

const ActivityChart = () => {
  const [highlightedPoint, setHighlightedPoint] = useState<HighlightedPoint | null>(null);

  // Fetch customer activity data using the query hook
  const { data, isLoading, error } = useCustomerActivity();

  // Function to convert days of the week to numbers for X axis
  const dayToNumber = (day: string) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return days.indexOf(day);
  };

  // Loading and error handling
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading data</Box>;
  }

  // Check if data and customerActivity are available before mapping
  const dataForChart = data?.customerActivity?.map((entry: CustomerActivity) => ({
    x: dayToNumber(entry.day),
    y: entry.activity,
    z: entry.activity, // Size of the bubble (activity)
    location: entry.location,
    day: entry.day,
  })) || [];

  return (
    <Box width="100%" mt={4}>
      <Button onClick={() => setHighlightedPoint(null)} color="gray.800" mb={4}>
        Reset Hover
      </Button>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          onMouseLeave={() => setHighlightedPoint(null)}
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
              if (active && payload && payload.length) {
                const { day, location, activity } = payload[0].payload;
                setHighlightedPoint({ day, location, activity });
                return (
                  <div style={{ backgroundColor: "#fff", padding: "10px", border: "1px solid #ccc" }}>
                    <strong>{`Location: ${location}`}</strong>
                    <p>{`Day: ${day}`}</p>
                    <p>{`Activity: ${activity}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Scatter
            name="Customer Activity"
            data={dataForChart}
            fill="#8884d8"
            shape="circle"
            line={{ stroke: "#8884d8", strokeWidth: 1 }}
            radius={8}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Display the highlighted point below the chart */}
      {highlightedPoint && (
        <Box mt={4}>
          <strong>Highlighted Data:</strong>
          <p>{`Day: ${highlightedPoint.day}`}</p>
          <p>{`Location: ${highlightedPoint.location}`}</p>
          <p>{`Activity: ${highlightedPoint.activity}`}</p>
        </Box>
      )}
    </Box>
  );
};

export default ActivityChart;
