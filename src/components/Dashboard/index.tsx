import { CircularProgress } from '@material-ui/core';
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
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
      // fetch first
        setLoading(true);
        fetchPage(1)
        .then((r) => {
          setLoading(false);
          setTransactions({ 1:  r?.transactions })
          setMaxPage(Math.ceil(r?.totalCount / 10));
        })
        .catch((e) => {
          setError(e);
        })
    }, []);

    useEffect(() => {
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
              setError(e);
            });
        }
      }
    }, [transactions, maxPage]);

  return (
    loading ? 
    <CircularProgress /> :
    <TransactionTable totalAmount={totalAmount} transactions={transactions} currentPage={currentPage} maxPage={maxPage} />
  )
};

export default Dashboard;