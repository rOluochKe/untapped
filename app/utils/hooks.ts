import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchMetrics,
  fetchSalesTrends,
  fetchRevenueByRegion,
  fetchExpensesByCategory,
  fetchCustomerActivity,
  fetchTransactionLogs,
  addTransaction,
} from "./api";

export const useMetrics = (dateRange: string, customRange?: { startDate: Date | null; endDate: Date | null }) => {
    return useQuery({
      queryKey: ["metrics", dateRange, customRange ? `${customRange.startDate?.toISOString()}-${customRange.endDate?.toISOString()}` : ""],
      queryFn: () => fetchMetrics(dateRange, customRange),
      staleTime: 5 * 60 * 1000,
      enabled: !!dateRange, 
    });
  };

export const useSalesTrends = () =>
  useQuery({
    queryKey: ["salesTrends"],
    queryFn: fetchSalesTrends,
    staleTime: 5 * 60 * 1000,
  });

export const useRevenueByRegion = () =>
  useQuery({
    queryKey: ["revenueByRegion"],
    queryFn: fetchRevenueByRegion,
    staleTime: 5 * 60 * 1000,
  });

export const useExpensesByCategory = () =>
  useQuery({
    queryKey: ["expensesByCategory"],
    queryFn: fetchExpensesByCategory,
    staleTime: 5 * 60 * 1000,
  });

export const useCustomerActivity = () =>
  useQuery({
    queryKey: ["customerActivity"],
    queryFn: fetchCustomerActivity,
    staleTime: 5 * 60 * 1000,
  });

export const useTransactionLogs = () =>
  useQuery({
    queryKey: ["transactionLogs"],
    queryFn: fetchTransactionLogs,
    staleTime: 5 * 60 * 1000,
  });

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionLogs"]);
    },
  });
};
