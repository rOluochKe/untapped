import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useTransactionLogs } from "@/app/utils/hooks";
import { Loader, InputField, SelectField, Heading, TableComponent } from "./index";
import { Transaction } from "@/app/types/types";

const TransactionTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const { data, isLoading, error } = useTransactionLogs();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <Box>Error loading transaction data</Box>;

  // Apply filters: Search, Type, and Status
  const filteredData = (data || []).filter((transaction: Transaction) => {
    const matchesSearchQuery = transaction.transactionId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTypeFilter = typeFilter === "All" || transaction.type === typeFilter;
    const matchesStatusFilter = statusFilter === "All" || transaction.status === statusFilter;

    return matchesSearchQuery && matchesTypeFilter && matchesStatusFilter;
  });

  const columns = [
    { Header: "Date", accessor: "date" },
    { Header: "Transaction ID", accessor: "transactionId" },
    { Header: "Amount ($)", accessor: "amount" },
    { Header: "Type", accessor: "type" },
    { Header: "Status", accessor: "status" },
  ];

  return (
    <Box width="100%" mt={4} p={4}>
      <Heading size="md" color="gray.600" mb={4}>
        Transaction Logs
      </Heading>

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <InputField
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Transaction ID"
        />

        <Box display="flex" alignItems="center" gap="24px">
          <SelectField
            id="typeFilter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[
              { value: "All", label: "Filter by Type (All)" },
              { value: "Sale", label: "Sale" },
              { value: "Expense", label: "Expense" },
            ]}
          />

          <SelectField
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "All", label: "Filter by Status (All)" },
              { value: "Completed", label: "Completed" },
              { value: "Pending", label: "Pending" },
            ]}
          />
        </Box>
      </Box>

      <TableComponent columns={columns} data={filteredData} />
    </Box>
  );
};

export default TransactionTable;
