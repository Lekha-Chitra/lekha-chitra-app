import { useEffect, useState } from "react";
import { getTransactions,filterTransactions } from "../services/transactionService";

function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  // const [pagination, setPagination] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);

      const response = await getTransactions(pageNumber, pageSize);

      if (response.isSuccess) {
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const searchTransactions = async (filters) => {
    try {
      setLoading(true);

      const response = await filterTransactions(filters);

      if (response.isSuccess) {
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (filters) => {
    try {
      setLoading(true);

      const response = await filterTransactions(filters);

      if (response.isSuccess) {
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  

  return {
    transactions,
    pagination,
    loading,
    fetchTransactions,
    searchTransactions,
    applyFilters,
  };
}

export default useTransactions;
