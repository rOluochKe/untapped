import axios from "axios";
import { Transaction, MetricsParams } from "../types/types";

const apiClient = axios.create({
  baseURL: "http://localhost:3001", 
  timeout: 10000, 
});

export const fetchMetrics = async (
    dateRange: string,
    customRange?: { startDate: Date | null; endDate: Date | null }
  ) => {
    const params: MetricsParams = { dateRange };
    
    if (customRange?.startDate && customRange?.endDate) {
      params.startDate = customRange.startDate.toISOString();
      params.endDate = customRange.endDate.toISOString();
    }
  
    const response = await apiClient.get(`/metrics`, { params });
    return response.data;
};
  

export const fetchSalesTrends = async () => {
  const response = await apiClient.get("/salesTrends");
  return response.data;
};

export const fetchRevenueByRegion = async () => {
  const response = await apiClient.get("/revenueByRegion");
  return response.data;
};

export const fetchExpensesByCategory = async () => {
  const response = await apiClient.get("/expensesByCategory");
  return response.data;
};

export const fetchCustomerActivity = async () => {
  const response = await apiClient.get("/customerActivity");
  return response.data;
};

export const fetchTransactionLogs = async () => {
  const response = await apiClient.get("/transactionLogs");
  return response.data;
};

export const addTransaction = async (transaction: Omit<Transaction, "transactionId" | "id">): Promise<Transaction> => {
  const currentTransactions = await fetchTransactionLogs();
  const highestId = currentTransactions.reduce((maxId: number, trans: Transaction) => Math.max(maxId, trans.id), 0);
  const highestTransactionId = currentTransactions.reduce((maxTransId: number, trans: Transaction) => Math.max(maxTransId, parseInt(trans.transactionId.replace('TXN', ''))), 0);

  const newTransaction: Transaction = {
    ...transaction,
    id: highestId + 1,
    transactionId: `TXN0${highestTransactionId + 1}`
  };

  const response = await apiClient.post("/transactionLogs", newTransaction);
  return response.data;
};