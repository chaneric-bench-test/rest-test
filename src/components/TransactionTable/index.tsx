import { Table, TableHead, TableRow, TableCell, TableBody, Box, Button, Typography, TableContainer, Paper } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Transaction } from '../../types/Transaction';
import { formatCurrency } from '../utils';


const TransactionTable: React.FC<TransactionTableProps> = (props) => {

  const { transactions, totalAmount, currentPage, setCurrentPage, error } = props;

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <>
      <TableContainer component={Paper}>
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
              <TableCell>
                <Typography variant="h6">{formatCurrency(totalAmount)}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions?.[currentPage]?.map((t, index) => (
                // Normally not good to bind it to the index..but with the data we have there's not much else to use
                <TableRow key={`tableRow-${index}`}>
                  <TableCell>
                    {moment(t.Date).format('ll') || "N/A"}
                  </TableCell>
                  <TableCell>{t.Company || "N/A"}</TableCell>
                  <TableCell>{t.Ledger || "N/A"}</TableCell>
                  <TableCell>{formatCurrency(t.Amount)}</TableCell>
                </TableRow>
              ))}
            {error && (
              <TableRow>
                <TableCell>{error.message}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3} display="flex">
        <Box p={2}>
          <Button
            disabled={currentPage === 1}
            variant="contained"
            onClick={handlePrevious}
          >
            Previous
          </Button>
        </Box>
        <Box p={2}>
          <Button
            disabled={!transactions?.[currentPage + 1]}
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

interface TransactionTableProps {
  transactions: { [pageNo: number]: Array<Transaction> };
  totalAmount: number;
  currentPage: number;
  setCurrentPage: any;
  error?: Error;
}

export default TransactionTable;
