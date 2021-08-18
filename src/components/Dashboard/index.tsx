import { Box, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Transaction } from '../../types/Transaction';
import TransactionTable from '../TransactionTable';
import { fetchPage } from './utils';

const Dashboard: React.FC = () => {

  const [transactions, setTransactions] = useState<{ [pageNo: number]: Array<Transaction> }>({});
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  useEffect(() => {
      // fetch first page
        setLoading(true);
        fetchPage(1)
        .then((r) => {
          setLoading(false);
          setTransactions({ 1:  r?.transactions })
          setMaxPage(Math.ceil(r?.totalCount / 10));
        })
        .catch((e) => {
          setLoading(false);
          setError(e);
        })
    }, []);

    useEffect(() => {
      // fetch the rest of the pages only after fetching the first
      if (Object.keys(transactions).length === 1) {
        for (let i = 2; i <= maxPage; i++) {
          fetchPage(i)
            .then((r) => {
              setTransactions(prevTransactions => ({
                ...prevTransactions,
                [r.page]: r.transactions
              }))
            })
            .catch((e) => {
              setLoading(false);
              setError(e);
            });
        }
      }
      if (Object.keys(transactions).length === maxPage) {
        // EC - this should only run after all the fetches for the pages are finished
        const summedAmount = Object.values(transactions).flat()
        .map((t) => parseFloat(t.Amount))
        .reduce((acc, curr) => acc + curr, 0)
        setTotalAmount(summedAmount);
      }
    }, [transactions, maxPage]);

  return loading ? (
    <Box p={4}>
      <CircularProgress />
    </Box>
  ) : (
    <Box p={4}>
      <TransactionTable
        totalAmount={totalAmount}
        transactions={transactions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        error={error}
      />
    </Box>
  );
};

export default Dashboard;
