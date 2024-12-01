import React, { useState } from "react";
import { useSalesTrends, useRevenueByRegion, useExpensesByCategory } from "@/app/utils/hooks";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar } from "recharts";
import { Button, Grid, GridItem } from "@chakra-ui/react";

// Define types for the data
type SalesTrend = {
  month: string;
  sales: number;
  expenses: number;
};

type RevenueByRegion = {
  region: string;
  revenue: number;
};

type ExpensesByCategory = {
  category: string;
  amount: number;
};

const ChartSection = () => {
  // Use the custom hooks to fetch data
  const { data: salesTrends, isLoading: isLoadingSalesTrends, error: salesTrendsError } = useSalesTrends();
  const { data: revenueByRegion, isLoading: isLoadingRevenueByRegion, error: revenueByRegionError } = useRevenueByRegion();
  const { data: expensesByCategory, isLoading: isLoadingExpensesByCategory, error: expensesByCategoryError } = useExpensesByCategory();

  // State for toggling between cumulative and monthly breakdown
  const [isCumulative, setIsCumulative] = useState(false);

  // Loading state handling
  if (isLoadingSalesTrends || isLoadingRevenueByRegion || isLoadingExpensesByCategory) {
    return <div>Loading...</div>;
  }

  // Error handling
  if (salesTrendsError || revenueByRegionError || expensesByCategoryError) {
    return <div>Error loading data</div>;
  }

  // Prepare the data for the charts
  const salesTrendsData = salesTrends.map((data: SalesTrend) => ({
    month: data.month,
    sales: data.sales,
    expenses: data.expenses,
  }));

  const revenueData = revenueByRegion.map((region: RevenueByRegion) => ({
    region: region.region,
    revenue: region.revenue,
  }));

  const expensesData = expensesByCategory.map((category: ExpensesByCategory) => ({
    category: category.category,
    amount: category.amount,
  }));

  return (
    <div>
      {/* Toggle Button for Cumulative/Monthly Breakdown */}
      <Button onClick={() => setIsCumulative(!isCumulative)} color="gray.800" mb={4}>
        {isCumulative ? "Switch to Monthly Breakdown" : "Switch to Cumulative"}
      </Button>

      {/* Grid layout for the charts */}
      <Grid
        templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "repeat(3, 1fr)" }} // 1 per row on medium and smaller, 3 per row on large screens
        gap={6}
        mt={4}
        width="100%"
      >
        {/* Sales and Expenses Line Chart */}
        <GridItem>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" label={{ value: "Month", position: "bottom" }} />
              <YAxis label={{ value: "Amount ($)", angle: -90, position: "left" }} />
              <Tooltip />
              <Legend />
              <Text x={250} y={10} textAnchor="middle" fontSize={16} fontWeight="bold">
                Sales vs Expenses
              </Text>
              <Line
                type="monotone"
                dataKey={isCumulative ? "sales" : "expenses"}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GridItem>

        {/* Revenue by Region Bar Chart */}
        <GridItem>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" label={{ value: "Region", position: "bottom" }} />
              <YAxis label={{ value: "Revenue ($)", angle: -90, position: "left" }} />
              <Tooltip />
              <Legend />
              <Text x={250} y={10} textAnchor="middle" fontSize={16} fontWeight="bold">
                Revenue by Region
              </Text>
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>

        {/* Expenses by Category Pie Chart */}
        <GridItem>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {expensesData.map((entry: ExpensesByCategory, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.amount > 50000 ? "#82ca9d" : "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
              <Text x={250} y={30} textAnchor="middle" fontSize={16} fontWeight="bold">
                Expenses by Category
              </Text>
            </PieChart>
          </ResponsiveContainer>
        </GridItem>
      </Grid>
    </div>
  );
};

export default ChartSection;
