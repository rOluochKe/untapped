import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Transaction } from "@/app/types/types";

const TransactionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, "transactionId" | "id">) => void; // Exclude `transactionId` and `id`
  transaction?: Transaction;
}> = ({ isOpen, onClose, onSave, transaction }) => {
  const [formData, setFormData] = useState<Omit<Transaction, "transactionId" | "id">>({
    amount: 0,
    date: "",
    type: "Sale",
    status: "Completed",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (transaction) {
      const { transactionId, id, ...rest } = transaction; // Exclude `transactionId` and `id`
      setFormData(rest);
    } else {
      setFormData({
        amount: 0,
        date: "",
        type: "Sale",
        status: "Completed",
      });
    }
  }, [transaction]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.type) {
      newErrors.type = "Type is required";
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData); // Only pass formData excluding `transactionId` and `id`
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{transaction ? "Edit Transaction" : "Add Transaction"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="amount" isRequired mt={4} isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="0.01"
              step="0.01"
            />
            {errors.amount && <FormErrorMessage>{errors.amount}</FormErrorMessage>}
          </FormControl>

          <FormControl id="date" isRequired mt={4} isInvalid={!!errors.date}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
          </FormControl>

          <FormControl id="type" isRequired mt={4} isInvalid={!!errors.type}>
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="Sale">Sale</option>
              <option value="Expense">Expense</option>
            </Select>
            {errors.type && <FormErrorMessage>{errors.type}</FormErrorMessage>}
          </FormControl>

          <FormControl id="status" isRequired mt={4} isInvalid={!!errors.status}>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </Select>
            {errors.status && <FormErrorMessage>{errors.status}</FormErrorMessage>}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;