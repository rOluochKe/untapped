import React, { useState } from "react";
import { useSalesTrends, useRevenueByRegion, useExpensesByCategory } from "@/app/utils/hooks";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar } from "recharts";
import { Button, Grid, GridItem, Box } from "@chakra-ui/react";
import { SalesTrend, RevenueByRegion, ExpensesByCategory } from "@/app/types/types";
import { Loader, Heading } from "./index";

const ChartSection = () => {
  const { data: salesTrends, isLoading: isLoadingSalesTrends, error: salesTrendsError } = useSalesTrends();
  const { data: revenueByRegion, isLoading: isLoadingRevenueByRegion, error: revenueByRegionError } = useRevenueByRegion();
  const { data: expensesByCategory, isLoading: isLoadingExpensesByCategory, error: expensesByCategoryError } = useExpensesByCategory();

  // State for toggling between cumulative and monthly breakdown
  const [isCumulative, setIsCumulative] = useState(false);

  if (isLoadingSalesTrends || isLoadingRevenueByRegion || isLoadingExpensesByCategory) {
    return <Loader />;
  }

  if (salesTrendsError || revenueByRegionError || expensesByCategoryError) {
    return <div>Error loading data</div>;
  }

  // Map sales trend data
  const salesTrendsData = salesTrends.map((data: SalesTrend) => ({
    month: data.month,
    sales: data.sales,
    expenses: data.expenses,
  }));

  // Compute cumulative sales and expenses only if isCumulative is true
  const cumulativeSalesTrendsData = salesTrendsData.map((data: SalesTrend, index: number) => {
    const cumulativeSales = salesTrendsData.slice(0, index + 1).reduce((acc: number, curr: SalesTrend) => acc + curr.sales, 0);
    const cumulativeExpenses = salesTrendsData.slice(0, index + 1).reduce((acc: number, curr: SalesTrend) => acc + curr.expenses, 0);
    return {
      ...data,
      cumulativeSales,
      cumulativeExpenses,
    };
  });

  const revenueData = revenueByRegion.map((region: RevenueByRegion) => ({
    region: region.region,
    revenue: region.revenue,
  }));

  const expensesData = expensesByCategory.map((category: ExpensesByCategory) => ({
    category: category.category,
    amount: category.amount,
  }));

  // Function to format numbers like 1K, 10K, etc.
  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000)}K`;
    }
    return value.toString();
  };

  return (
    <Box>
      <Grid
        templateColumns={{ base: "1fr", sm: "1fr", md: "1fr", lg: "repeat(3, 1fr)" }} 
        gap={4}
        mt={4}
        width="100%"
      >
        {/* Sales and Expenses Line Chart */}
        <GridItem>
          <Heading size="sm" color="gray.600" mb={4}>
            Sales & Expenses Trend
          </Heading>

        {/* Toggle Button for Cumulative/Monthly Breakdown */}
          <Button
            onClick={() => setIsCumulative(!isCumulative)}
            color="gray.800"
            mb={4}
            border="2px solid"
            borderColor="gray.600"
            _hover={{
                bg: "gray.100", 
                borderColor: "gray.800", 
            }}
            _active={{
                bg: "gray.200", 
                borderColor: "gray.800", 
            }}
            >
            {isCumulative ? "Switch to Monthly Breakdown" : "Switch to Cumulative"}
            </Button>

          <ResponsiveContainer width="100%" height={250} style={{ padding: 10 }}>
            <LineChart data={isCumulative ? cumulativeSalesTrendsData : salesTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" label={{ value: "Month", position: "bottom" }} />
              <YAxis label={{ value: "Amount ($)", angle: -90, position: "left" }} tickFormatter={formatValue} />
              <Tooltip formatter={(value: number | string) => formatValue(+value)} />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ marginBottom: -20 }} />
              <Text x={250} y={10} textAnchor="middle" fontSize={16} fontWeight="bold">
                Sales vs Expenses
              </Text>
              <Line
                type="monotone"
                dataKey={isCumulative ? "cumulativeSales" : "sales"}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Sales"
              />
              <Line
                type="monotone"
                dataKey={isCumulative ? "cumulativeExpenses" : "expenses"}
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </GridItem>

        {/* Revenue by Region Bar Chart */}
        <GridItem>
          <Heading size="sm" color="gray.600" mb={4}>
            Revenue by Region
          </Heading>
          <ResponsiveContainer width="100%" height={250} style={{ padding: 10 }}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" label={{ value: "Region", position: "bottom" }} />
              <YAxis label={{ value: "Revenue ($)", angle: -90, position: "left" }} tickFormatter={formatValue} />
              <Tooltip formatter={(value: number | string) => formatValue(+value)} />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ marginBottom: -20 }} />
              <Text x={250} y={10} textAnchor="middle" fontSize={16} fontWeight="bold">
                Revenue by Region
              </Text>
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>

        {/* Expenses by Category Pie Chart */}
        <GridItem>
            <Heading size="sm" color="gray.600" mb={4}>
                Expenses by Category
            </Heading>
            <ResponsiveContainer width="100%" height={250} style={{ padding: 10 }}>
                <PieChart>
                    <Pie
                        data={expensesData}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        fill="#8884d8"
                        label={({ percent }) => {
                            return `${(percent * 100).toFixed(1)}%`;
                        }}
                    >
                        {expensesData.map((entry: ExpensesByCategory, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.amount > 50000 ? "#82ca9d" : "#8884d8"} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatValue(Number(value))} />
                    <Text x={250} y={30} textAnchor="middle" fontSize={16} fontWeight="bold">
                        Expenses by Category
                    </Text>
                </PieChart>
            </ResponsiveContainer>
            </GridItem>
      </Grid>
    </Box>
  );
};

export default ChartSection;
