// import { useState } from "react";

// import Sidebar from "../components/Sidebar";
// // import DashboardHeader from "../components/DashboardHeader";

// import SearchBar from "../components/SearchBar";
// import ActionButtons from "../components/ActionButtons";

// import AddClientModal from "../components/AddClientModal";
// function Dashboard() {
//   const [openAddClient, setOpenAddClient] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-[#F3F3F3]">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <main
//         className="
//           flex-1
//           overflow-x-hidden
//           p-4
//           md:p-6
//           lg:p-8
//         "
//       >
//         {/* <DashboardHeader setSidebarOpen={setSidebarOpen} /> */}

//         <ActionButtons onAddClient={() => setOpenAddClient(true)} />

//         <AddClientModal
//           open={openAddClient}
//           onClose={() => setOpenAddClient(false)}
//         />

//         <SearchBar />
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import ActionButtons from "../components/ActionButtons";
import AddClientModal from "../components/AddClientModal";
import ClientDataTable from "../components/ClientDataTable";
import useClients from "../hooks/useClients";
import { clientColumns } from "../customData/clientColumns";
import Header from "../../auth/pages/Header";
function Dashboard() {
  const [openAddClient, setOpenAddClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const { clients, loading, error } = useClients();
  return (
    <div className="flex min-h-screen bg-[#F3F3F3]">
      
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className="
          flex-1
          overflow-x-hidden
          p-4
          md:p-6
          lg:p-8
        "
      >
      <div className="-mt-2">
  <Header title="Clients" />
</div>
        {/* Mobile Menu Button */}
        <div className="md:hidden mb-6 flex ">
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              bg-[#032A5C]
              text-white
              p-3
              rounded-md
              shadow-md
              cursor-pointer
            "
          >
            <FaBars size={10} />
          </button>
        </div>



        {/* Future Table Section */}
        <div
          className="
            mt-3
            bg-white
            rounded-lg
            min-h-[400px]
            shadow-sm
          "
        >
          <ClientDataTable
            columns={clientColumns}
            data={clients}
            loading={loading}
            onEdit={(client) => {
              console.log(client);
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;