import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import React from 'react';
import { Transaction } from '../../types/Transaction';


const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, totalAmount, maxPage, currentPage }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Company</TableCell>
          <TableCell>Account</TableCell>
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
        <TableRow>
          <TableCell>
            Hello
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

interface TransactionTableProps {
  transactions: { [pageNo: number]: Array<Transaction> };
  totalAmount: number;
  maxPage: number;
  currentPage: number;
}

export default TransactionTable;
