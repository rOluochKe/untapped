import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";
import { useTable, usePagination, useSortBy } from "react-table";
import { useAppColorMode } from "../ChakraUIProvider";

interface TableComponentProps {
  columns: any;
  data: any;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data }) => {
  const { colorMode } = useAppColorMode();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const tableBg = colorMode === "light" ? "gray.50" : "gray.700";

  return (
    <Box bg={tableBg} p={4} borderRadius="md">
      <Table {...getTableProps()} variant="simple" size="md">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th {...column.getHeaderProps()} key={index}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} key={cell.row.id + cell.column.id}>
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
        <Button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {">>"}
        </Button>
        <Box>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Box>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map((size, index) => (
            <option key={index} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </Box>
    </Box>
  );
};

export default TableComponent;
