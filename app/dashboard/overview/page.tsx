"use client";

import { useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { addDays } from "date-fns";
import { useMetrics } from "@/app/utils/hooks";
import {
  KPICard,
  DateRangeSelector,
  HeaderTitle,
  Loader,
  ChartsSection,
  ActivityChart,
  TransactionTable,
} from "@/app/components/ui/";

const filterDataByDateRange = (data: { value: number; date: string }[], startDate: Date, endDate: Date) => {
  return data.filter(item => {
    const itemDate = new Date(item.date); // Ensure item.date is a Date object
    return itemDate >= startDate && itemDate <= endDate;
  });
};

const calculateTotal = (filteredData: { value: number; date: string }[]) => {
  return filteredData.reduce((total, item) => total + item.value, 0);
};

const getPredefinedDateRange = (range: string) => {
  const today = new Date();
  switch (range) {
    case "last7days":
      return { startDate: addDays(today, -7), endDate: today };
    case "last30days":
      return { startDate: addDays(today, -30), endDate: today };
    default:
      return { startDate: today, endDate: today }; // Default to today if no range is selected
  }
};

const getFilteredData = (
  metricData: { value: number; date: string }[],
  dateRange: string,
  customRange: { startDate?: Date; endDate?: Date }
) => {
  let { startDate, endDate } = customRange;

  if (dateRange !== "custom") {
    const predefinedRange = getPredefinedDateRange(dateRange);
    startDate = predefinedRange.startDate;
    endDate = predefinedRange.endDate;
  }

  if (!startDate || !endDate) return metricData;

  // Ensure dates are in Date format
  const start = new Date(startDate);
  const end = new Date(endDate);

  const filtered = filterDataByDateRange(metricData, start, end);

  return filtered;
};

const Page = () => {
  const [dateRange, setDateRange] = useState<string>("last7days");
  const [customRange, setCustomRange] = useState<{ startDate?: Date; endDate?: Date }>({});

  const { data, isLoading, error } = useMetrics(dateRange, customRange);

  const handleDateRangeSelect = (range: string, customRange?: { startDate: Date; endDate: Date }) => {
    setDateRange(range);
    if (customRange) {
      setCustomRange(customRange);
    } else {
      setCustomRange({});
    }
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <Box>Error loading metrics data</Box>;

  const filteredTotalSales = getFilteredData(data.totalSales, dateRange, customRange);
  const filteredTotalExpenses = getFilteredData(data.totalExpenses, dateRange, customRange);
  const filteredNetProfit = getFilteredData(data.netProfit, dateRange, customRange);
  const filteredActiveUsers = getFilteredData(data.activeUsers, dateRange, customRange);

  const totalSales = calculateTotal(filteredTotalSales);
  const totalExpenses = calculateTotal(filteredTotalExpenses);
  const netProfit = calculateTotal(filteredNetProfit);
  const activeUsers = calculateTotal(filteredActiveUsers);

  const isPositive = (value: number) => value > 0;

  return (
    <Box p={2}>
      <HeaderTitle title="Dashboard Overview" subtitle={`Date Range: ${dateRange}`} />
      <DateRangeSelector onSelectDateRange={handleDateRangeSelect} metrics={data} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <KPICard
          label="Total Sales"
          value={totalSales}
          isPositive={isPositive(totalSales)}
          isCurrency={true}
        />
        <KPICard
          label="Total Expenses"
          value={totalExpenses}
          isPositive={isPositive(totalExpenses)}
          isCurrency={true}
        />
        <KPICard
          label="Net Profit"
          value={netProfit}
          isPositive={isPositive(netProfit)}
          isCurrency={true}
        />
        <KPICard
          label="Active Users"
          value={activeUsers}
          isPositive={isPositive(activeUsers)}
          isCurrency={false}
        />
      </SimpleGrid>

      <Box my={5} />
      <ChartsSection />
      <Box my={5} />
      <ActivityChart />
      <Box my={5} />
      <TransactionTable />
    </Box>
  );
};

export default Page;
