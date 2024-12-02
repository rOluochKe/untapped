/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface TableColumn {
  Header: string;
  accessor: string;
}

// Make TableComponent generic by allowing it to accept any row data type
interface TableComponentProps<T extends { [key: string]: any }> {
  columns: TableColumn[];
  data: T[];
}

const TableComponent = <T extends { [key: string]: any }>({ columns, data }: TableComponentProps<T>) => {
  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr bg="gray.200">
          {columns.map((column) => (
            <Th key={column.accessor}>{column.Header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <Tr key={index} bg="gray.50" color="gray.800">
              {columns.map((column) => (
                <Td key={column.accessor}>{row[column.accessor as keyof T]}</Td>
              ))}
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={columns.length} textAlign="center">
              No transactions found.
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default TableComponent;
