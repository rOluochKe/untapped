import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001", 
  timeout: 10000, 
});

type MetricsParams = {
    dateRange: string;
    startDate?: string;
    endDate?: string;
};

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
