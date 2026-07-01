import Summary from "../components/summary";
import Clients from "../components/clients";
import Sidebar from "../../client/components/Sidebar";
import Header from "../../auth/pages/Header";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div className="flex min-h-screen bg-[#F3F3F3]">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

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
          <Header title="Dashboard" />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              bg-[#032A5C]
              text-white
              p-3
              rounded-md
              shadow-md
            "
          >
            <FaBars size={10} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Summary Cards */}
          <Summary />

          {/* Client Analytics */}
          <Clients />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;