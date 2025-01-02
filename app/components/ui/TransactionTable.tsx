import React, { useState, useMemo } from "react";
import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useTransactionLogs, useAddTransaction } from "@/app/utils/hooks";
import { Loader, InputField, SelectField, Heading, TableComponent } from "./index";
import { Transaction } from "@/app/types/types";
import { useAppColorMode } from "../ChakraUIProvider";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TransactionModal from "../modal/TransactionModal";

const TransactionTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const { data, isLoading, error } = useTransactionLogs();
  const { colorMode } = useAppColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addTransactionMutation = useAddTransaction();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddClick = () => {
    setSelectedTransaction(null);
    onOpen();
  };

  const handleSave = (transaction: Omit<Transaction, "transactionId" | "id">) => {
    if (!transaction.date || !transaction.amount || !transaction.type || !transaction.status) {
      toast({
        title: "Validation error.",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    addTransactionMutation.mutate(transaction, {
      onSuccess: () => {
        toast({
          title: "Transaction added.",
          description: "The transaction was successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (err) => {
        toast({
          title: "Add failed.",
          description: err.message || "There was an error adding the transaction.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
    onClose();
  };

  const filteredData = useMemo(() => {
    return (data || []).filter((transaction: Transaction) => {
      const matchesSearchQuery = transaction.transactionId
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTypeFilter = typeFilter === "All" || transaction.type === typeFilter;
      const matchesStatusFilter = statusFilter === "All" || transaction.status === statusFilter;
      return matchesSearchQuery && matchesTypeFilter && matchesStatusFilter;
    });
  }, [data, searchQuery, typeFilter, statusFilter]);

  const columns = useMemo(() => [
    { Header: "Date", accessor: "date" },
    { Header: "Transaction ID", accessor: "transactionId" },
    { Header: "Amount ($)", accessor: "amount" },
    { Header: "Type", accessor: "type" },
    { Header: "Status", accessor: "status" }
  ], []);

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Date", "Transaction ID", "Amount ($)", "Type", "Status"]],
      body: filteredData.map((data: Transaction) => [
        data.date,
        data.transactionId,
        data.amount,
        data.type,
        data.status,
      ]),
    });
    doc.save("transactions.pdf");
  };

  if (isLoading) return <Loader />;
  if (error) return <Box>Error loading transaction data</Box>;

  return (
    <Box
      width="100%"
      mt={4}
      p={4}
      bg={colorMode === "light" ? "gray.100" : "gray.800"}
      color={colorMode === "light" ? "black" : "white"}
    >
      <Heading size="sm" color={colorMode === "light" ? "black" : "white"} mb={4}>
        Transaction Logs
      </Heading>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <InputField
          id="searchQuery"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Transaction ID"
        />
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
        <Button onClick={handleAddClick}>Add Transaction</Button>
        <Button onClick={exportToPDF}>Export to PDF</Button>
      </Box>
      <TableComponent columns={columns} data={filteredData} />
      <TransactionModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        transaction={selectedTransaction || undefined}
      />
    </Box>
  );
};

export default TransactionTable;