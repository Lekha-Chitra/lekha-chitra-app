import { useEffect, useState } from "react";
import { getClients } from "../services/transactionService";

function useTransactionClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const response = await getClients();
       console.log(response.data.clients); 

      if (response.isSuccess) {
        setClients(response.data.clients);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    refreshClients: fetchClients,
  };
}

export default useTransactionClients;
