import { useEffect, useState } from "react";
import { getClients } from "../services/clientServices";

function useClients() {
  const [clients, setClients] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const fetchClients = async (pageNumber = 1, pageSize = 10) => {
    try {
      setLoading(true);

      const response = await getClients(pageNumber, pageSize);

      setClients(response.data.clients);

      setPagination(response.data.pagination);

      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    pagination,
    loading,
    error,
    fetchClients,
  };
}

export default useClients;
