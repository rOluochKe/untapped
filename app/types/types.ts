export interface Transaction {
    id: number;
    date: string;
    transactionId: string;
    amount: number;
    type: "Sale" | "Expense";
    status: "Completed" | "Pending";
}

export type SalesTrend = {
    month: string;
    sales: number;
    expenses: number;
};
  
export type RevenueByRegion = {
    region: string;
    revenue: number;
};

export type ExpensesByCategory = {
    category: string;
    amount: number;
};
  