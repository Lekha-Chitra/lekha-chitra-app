
import { useRef, useState } from "react";
import {
  FaBars,
  FaChartPie,
  FaUsers,
  FaMoneyBillWave,
  FaFilter,
} from "react-icons/fa";

import Summary from "../components/summary";
import Clients from "../components/clients";
import Sidebar from "../../client/components/Sidebar";
import Header from "../../auth/pages/Header";

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const overviewRef = useRef(null);
  const clientsRef = useRef(null);
  const transactionsRef = useRef(null);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sections = [
    {
      title: "Overview",
      icon: <FaChartPie size={13} />,
      ref: overviewRef,
    },
    {
      title: "Clients",
      icon: <FaUsers size={13} />,
      ref: clientsRef,
    },
    {
      title: "Transactions",
      icon: <FaMoneyBillWave size={13} />,
      ref: transactionsRef,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className="
          flex-1
          min-h-screen
          overflow-y-auto
          overflow-x-hidden
          p-4
          md:p-6
          lg:p-8
        "
      >
        <Header title="Dashboard" />

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 mb-5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#032A5C] text-white p-3 rounded-lg shadow"
          >
            <FaBars size={14} />
          </button>
        </div>

        {/* Navigation + Filters */}
        <div className="sticky top-0 z-20 bg-[#F6F8FB] py-2 mb-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            {/* Navigation */}
            <div className="flex flex-wrap gap-3">
              {sections.map((section) => (
                <button
                  key={section.title}
                  onClick={() => scrollToSection(section.ref)}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-white
                    border
                    border-gray-200
                    text-gray-700
                    text-sm
                    font-medium
                    shadow-sm
                    hover:bg-[#032A5C]
                    hover:text-white
                    hover:border-[#032A5C]
                    transition
                  "
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                bg-white
                border
                border-gray-200
                rounded-xl
                shadow-sm
                p-3
                w-full
                xl:w-auto
              "
            >
              <FaFilter className="text-[#032A5C]" />

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  From
                </span>

                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      fromDate: e.target.value,
                    }))
                  }
                  className="
                    border
                    border-gray-300
                    rounded-md
                    px-2
                    py-1
                    text-xs
                    focus:outline-none
                    focus:border-[#032A5C]
                  "
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  To
                </span>

                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      toDate: e.target.value,
                    }))
                  }
                  className="
                    border
                    border-gray-300
                    rounded-md
                    px-2
                    py-1
                    text-xs
                    focus:outline-none
                    focus:border-[#032A5C]
                  "
                />
              </div>

              <button
                className="
                  px-4
                  py-2
                  rounded-md
                  bg-[#032A5C]
                  text-white
                  text-xs
                  font-medium
                  hover:bg-[#021d40]
                  transition
                "
              >
                Apply
              </button>

              <button
                className="
                  px-4
                  py-2
                  rounded-md
                  border
                  border-[#032A5C]
                  text-[#032A5C]
                  text-xs
                  font-medium
                  hover:bg-[#032A5C]
                  hover:text-white
                  transition
                "
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <section ref={overviewRef}>
            <Summary />
          </section>

          <section ref={clientsRef}>
            <Clients />
          </section>

          <section
            ref={transactionsRef}
            className="
              bg-white
              rounded-xl
              shadow-sm
              border
              border-gray-100
              p-6
            "
          >
            <h2 className="text-xl font-semibold text-[#032A5C]">
              Transaction Analytics
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Transaction analytics will appear here.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;