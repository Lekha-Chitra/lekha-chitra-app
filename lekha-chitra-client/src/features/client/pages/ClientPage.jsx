import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import ClientDataTable from "../components/ClientDataTable";
import Header from "../../auth/pages/Header";

import useClients from "../hooks/useClients";
import { clientColumns } from "../customData/clientColumns";

function ClientPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { clients, pagination, loading, fetchClients } = useClients();

  useEffect(() => {
    fetchClients(
      paginationModel.page + 1,
      paginationModel.pageSize
    );
  }, [paginationModel]);

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main
        className="
          md:ml-[70px]
          px-4 pt-1 pb-4
          md:px-6 md:pt-2 md:pb-6
          lg:px-8 lg:pt-2 lg:pb-8
          min-h-screen
          transition-all
          duration-300
        "
      >
        <Header title="Clients" />

        <div className="md:hidden mt-4 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#032A5C] text-white p-3 rounded-md shadow-md"
          >
            <FaBars size={18} />
          </button>
        </div>

        <div className="mt-4 rounded-lg shadow-sm min-h-[400px]">
          <ClientDataTable
        columns={clientColumns}
          data={clients}
          loading={loading}
          pagination={pagination}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
            fetchClients={fetchClients}
            onEdit={(client) => console.log(client)}
          />
        </div>
      </main>
    </div>
  );
}

export default ClientPage;