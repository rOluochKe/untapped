"use client";

import { useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useMetrics } from "@/app/utils/hooks";
import { KPICard, DateRangeSelector, HeaderTitle, Loader, ChartsSection, ActivityChart, TransactionTable } from "@/app/components/ui/";

const filterDataByDateRange = (data: { value: number; date: string }[], startDate: Date, endDate: Date) => {
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

const Page = () => {
  const [dateRange, setDateRange] = useState<string>("last7days");
  const [customRange, setCustomRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const { data, isLoading, error } = useMetrics(dateRange, customRange);

  const handleDateRangeSelect = (range: string, customRange?: { startDate: Date; endDate: Date }) => {
    setDateRange(range);
    if (customRange) {
      setCustomRange(customRange);
    } else {
      setCustomRange({ startDate: null, endDate: null });
    }
  };

  const getFilteredData = (metricData: { value: number; date: string }[], startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return metricData;
    return filterDataByDateRange(metricData, startDate, endDate);
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <Box>Error loading metrics data</Box>;

  const filteredTotalSales = getFilteredData(data.totalSales, customRange.startDate, customRange.endDate);
  const filteredTotalExpenses = getFilteredData(data.totalExpenses, customRange.startDate, customRange.endDate);
  const filteredNetProfit = getFilteredData(data.netProfit, customRange.startDate, customRange.endDate);
  const filteredActiveUsers = getFilteredData(data.activeUsers, customRange.startDate, customRange.endDate);

  return (
    <Box p={2}>
      <HeaderTitle title="Dashboard Overview" subtitle={`Date Range: ${dateRange}`} />
      <DateRangeSelector onSelectDateRange={handleDateRangeSelect} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <KPICard
          label="Total Sales"
          value={filteredTotalSales} 
          isPositive={filteredTotalSales[0]?.value > 0}
        />
        <KPICard
          label="Total Expenses"
          value={filteredTotalExpenses} 
          isPositive={filteredTotalExpenses[0]?.value > 0}
        />
        <KPICard
          label="Net Profit"
          value={filteredNetProfit} 
          isPositive={filteredNetProfit[0]?.value > 0}
        />
        <KPICard
          label="Active Users"
          value={filteredActiveUsers} 
          isPositive={filteredActiveUsers[0]?.value > 0}
        />
      </SimpleGrid>

      <Box my={4}/>

      <ChartsSection />

      <Box my={4}/>

      <ActivityChart />

      <Box my={4}/>

      <TransactionTable />
    </Box>
  );
};

export default Page;
