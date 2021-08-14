import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Transaction } from '../../types/Transaction';


const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, totalAmount, maxPage, currentPage, setCurrentPage }) => {
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Date</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Company</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Account</Typography>
          </TableCell>
          <TableCell>{totalAmount}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions &&
          transactions?.[currentPage]?.map((t, index) => (
            // Normally not good to bind it to the index..but with the data we have there's not much else to use
            <TableRow key={`tableRow-${index}`}>
              <TableCell>{t.Date}</TableCell>
              <TableCell>{t.Company}</TableCell>
              <TableCell>{t.Ledger}</TableCell>
              <TableCell>{t.Amount}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <Box mt={3} display="flex">
          <Box>
            <Button
              disabled={currentPage === 1}
              variant="contained"
              onClick={handlePrevious}
            >
              Previous
            </Button>
          </Box>
          <Box>
            <Button
              disabled={currentPage === maxPage}
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </TableFooter>
    </Table>
  );
};

interface TransactionTableProps {
  transactions: { [pageNo: number]: Array<Transaction> };
  totalAmount: number;
  maxPage: number;
  currentPage: number;
  setCurrentPage: any;
}

export default TransactionTable;
