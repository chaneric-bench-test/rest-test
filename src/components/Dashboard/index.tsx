import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { callApi } from '../../api';
import { API_ENDPOINT, TRANSACTION } from '../../endpoints';
import { Transaction, TransactionResponse } from '../../types/Transaction';

const Dashboard: React.FC = () => {

  const [transactions, setTransactions] = useState<Array<Transaction>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setLoading(true);

    // EC - Fetch the first page on load.
    void callApi<TransactionResponse>(`${API_ENDPOINT}${TRANSACTION}/1.json`)
    .then((r) => {
      setLoading(false);
      setTransactions(r?.transactions);
    })
    .catch((e) => {
      setError(e);
    });
  }, [])
  return (
    loading ? 
    <CircularProgress /> :
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
        {transactions && transactions.map((t) => (
          <TableRow>
            <TableCell>{t.Date}</TableCell>
            <TableCell>{t.Company}</TableCell>
            <TableCell>{t.Ledger}</TableCell>
            <TableCell>{t.Amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};

export default Dashboard;
