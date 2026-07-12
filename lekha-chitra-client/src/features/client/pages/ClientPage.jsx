import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import ClientDataTable from "../components/ClientDataTable";
import Header from "../../auth/pages/Header";

import useClients from "../hooks/useClients";
import { clientColumns } from "../customData/clientColumns";

function ClientPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { clients, pagination, loading, fetchClients } = useClients();

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className="
          md:ml-[70px]
          p-4
          md:p-6
          lg:p-8
          min-h-screen
          transition-all
          duration-300
        "
      >
        <Header title="Clients" />

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#032A5C] text-white p-3 rounded-md shadow-md"
          >
            <FaBars size={18} />
          </button>
        </div>

        <div className="mt-4 bg-white rounded-lg shadow-sm min-h-[400px]">
          <ClientDataTable
            columns={clientColumns}
            data={clients}
            loading={loading}
            pagination={pagination}
            fetchClients={fetchClients}
            onEdit={(client) => console.log(client)}
          />
        </div>
      </main>
    </div>
  );
}

export default ClientPage;
