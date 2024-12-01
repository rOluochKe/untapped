import React, { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, Select } from "@chakra-ui/react";
import { useTransactionLogs } from "@/app/utils/hooks";  
import Loader from "./Loader";

interface Transaction {
  id: number;
  date: string;
  transactionId: string;
  amount: number;
  type: "Sale" | "Expense";
  status: "Completed" | "Pending";
}

const TransactionTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const { data, isLoading, error } = useTransactionLogs();

  console.log("Transaction data:", data);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <Box>Error loading metrics data</Box>;

  // Default to all data if no filters are applied
  const filteredData = (data || []).filter((transaction: Transaction) => {
    // Apply the search filter
    const matchesSearchQuery = transaction.transactionId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Apply the type filter
    const matchesTypeFilter = typeFilter === "All" || transaction.type === typeFilter;

    // Apply the status filter
    const matchesStatusFilter = statusFilter === "All" || transaction.status === statusFilter;

    // Return true if all conditions are met, otherwise return false
    return (
      (searchQuery ? matchesSearchQuery : true) && 
      (typeFilter !== "All" ? matchesTypeFilter : true) && 
      (statusFilter !== "All" ? matchesStatusFilter : true)
    );
  });

  return (
    <Box width="100%" mt={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Transaction ID"
          width="200px"
        />
        <Box>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            placeholder="Filter by Type"
            width="150px"
            mr={2}
          >
            <option value="All">All</option>
            <option value="Sale">Sale</option>
            <option value="Expense">Expense</option>
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by Status"
            width="150px"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </Select>
        </Box>
      </Box>

      {/* Transaction Table */}
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Transaction ID</Th>
            <Th>Amount</Th>
            <Th>Type</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.length > 0 ? (
            filteredData.map((transaction: Transaction) => (
              <Tr key={transaction.id} bg="gray.100" color="gray.700">
                <Td>{transaction.date}</Td>
                <Td>{transaction.transactionId}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.status}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5}>No transactions found.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionTable;
