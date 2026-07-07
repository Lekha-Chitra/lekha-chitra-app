import { useState } from "react";
import { addTransaction } from "../services/transactionService";

function useAddTransaction() {
  const [loading, setLoading] = useState(false);

  const saveTransaction = async (formData) => {
    try {
      setLoading(true);

      const response = await addTransaction(formData);

      return response;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveTransaction,
  };
}

export default useAddTransaction;


