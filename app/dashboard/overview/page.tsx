"use client";

import { useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useMetrics } from "@/app/utils/hooks";
import KPICard from "@/app/components/ui/KPICard";
import DateRangeSelector from "@/app/components/ui/DateRangeSelector";
import HeaderTitle from "@/app/components/ui/HeaderTitle";
import Loader from "@/app/components/ui/Loader";
import ChartsSection from "@/app/components/ui/ChartsSection";
import ActivityChart from "@/app/components/ui/ActivityChart";
import TransactionTable from "@/app/components/ui/TransactionTable";

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

  if (isLoading) return <Loader />;
  if (error || !data) return <Box>Error loading metrics data</Box>;

  return (
    <Box p={6}>
      <HeaderTitle title="Dashboard Overview" subtitle={`Date Range: ${dateRange}`} />
      <DateRangeSelector onSelectDateRange={handleDateRangeSelect} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <KPICard
          label="Total Sales"
          value={data.totalSales}
          isPositive={data.totalSales > 0}
          dateRange={dateRange}
        />
        <KPICard
          label="Total Expenses"
          value={data.totalExpenses}
          isPositive={data.totalExpenses > 0}
          dateRange={dateRange}
        />
        <KPICard
          label="Net Profit"
          value={data.netProfit}
          isPositive={data.netProfit > 0}
          dateRange={dateRange}
        />
        <KPICard
          label="Active Users"
          value={data.activeUsers}
          isPositive={data.activeUsers > 0}
          dateRange={dateRange}
        />
      </SimpleGrid>

      <ChartsSection />

      <ActivityChart />

      <TransactionTable />
    </Box>
  );
};

export default Page;
