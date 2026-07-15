// import { useRef, useState } from "react";
// import { FaBars, FaChartPie, FaUsers, FaMoneyBillWave } from "react-icons/fa";
// import Sidebar from "../../client/components/Sidebar";
// import Header from "../../auth/pages/Header";
// import DashboardToolbar from "../components/DashboardToolbar";

// import Summary from "../components/summary";
// import Clients from "../components/clients";
// import Transactions from "../components/Transactions";

// function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const overviewRef = useRef(null);
//   const clientsRef = useRef(null);
//   const transactionsRef = useRef(null);

//   const [filters, setFilters] = useState({
//     fromDate: "",
//     toDate: "",
//   });

//   const scrollToSection = (ref) => {
//     ref.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   const sections = [
//     {
//       title: "Overview",
//       icon: <FaChartPie size={13} />,
//       ref: overviewRef,
//     },
//     {
//       title: "Clients",
//       icon: <FaUsers size={13} />,
//       ref: clientsRef,
//     },
//     {
//       title: "Transactions",
//       icon: <FaMoneyBillWave size={13} />,
//       ref: transactionsRef,
//     },
//   ];

//   const handleApply = () => {
//     console.log(filters);
//   };

//   const handleReset = () => {
//     setFilters({
//       fromDate: "",
//       toDate: "",
//     });
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <main
//         className="
//           flex-1
//           md:ml-[70px]
//           min-h-screen

//         "
//       >
//         {/* ===================== Fixed Header ===================== */}

//         {/* <div
//           className="
//             fixed
//             top-0
//             left-0
//             md:left-[70px]
//             right-0
//             z-40
//             bg-[#F6F8FB]
//           "
//         >
//           <Header title="Dashboard" />

//           <div className="px-4 md:px-6 lg:px-8 pb-4">
//             <DashboardToolbar
//               sections={sections}
//               scrollToSection={scrollToSection}
//               filters={filters}
//               setFilters={setFilters}
//               onApply={handleApply}
//               onReset={handleReset}
//             />
//           </div>
//         </div> */}
//         <Header title="Dashboard" />

//         {/* ===================== Mobile Menu ===================== */}

//         {/* <div className="md:hidden fixed left-4 top-4 z-50">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="bg-[#032A5C] text-white p-3 rounded-lg shadow"
//           >
//             <FaBars size={15} />
//           </button>
//         </div> */}
//         <div className="md:hidden px-4 mt-4 mb-4">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="
//       w-11
//       h-11
//       rounded-xl
//       bg-[#032A5C]
//       text-white
//       shadow-md
//       flex
//       items-center
//       justify-center
//     "
//           >
//             <FaBars size={16} />
//           </button>
//         </div>

//         <div className="sticky top-0 z-50  py-4 px-4 md:px-6 lg:px-8">
//           <DashboardToolbar
//             sections={sections}
//             scrollToSection={scrollToSection}
//             filters={filters}
//             setFilters={setFilters}
//             onApply={handleApply}
//             onReset={handleReset}
//           />
//         </div>

//         {/* ===================== Scrollable Content ===================== */}

//         <div
//           className="

//             px-4
//             md:px-6
//             lg:px-8
//             pb-8
//             space-y-8
//           "
//         >
//           <section ref={overviewRef}>
//             <Summary />
//           </section>

//           <section ref={clientsRef}>
//             <Clients />
//           </section>

//           <section ref={transactionsRef}>
//             <Transactions />
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardPage;

// // import { useRef, useState, useEffect } from "react";
// // import { FaBars, FaChartPie, FaUsers, FaMoneyBillWave } from "react-icons/fa";
// // import Sidebar from "../../client/components/Sidebar";
// // import Header from "../../auth/pages/Header";
// // import DashboardToolbar from "../components/DashboardToolbar";
// // import Summary from "../components/summary";
// // import Clients from "../components/clients";
// // import Transactions from "../components/Transactions";
// // import {
// //   getSummary,
// //   getClientSummary,
// //   getTransactionSummary,
// // } from "../services/dashboardServices";

// // function DashboardPage() {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   const overviewRef = useRef(null);
// //   const clientsRef = useRef(null);
// //   const transactionsRef = useRef(null);

// //   const [filters, setFilters] = useState({ fromDate: "", toDate: "" });
// //   const [appliedFilters, setAppliedFilters] = useState({
// //     fromDate: "",
// //     toDate: "",
// //   });

// //   const [summaryData, setSummaryData] = useState(null);
// //   const [clientData, setClientData] = useState(null);
// //   const [transactionData, setTransactionData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchAll = async (from, to) => {
// //     setLoading(true);
// //     try {
// //       const [s, c, t] = await Promise.allSettled([
// //         getSummary(from, to),
// //         getClientSummary(from, to),
// //         getTransactionSummary(from, to),
// //       ]);
// //       // setSummaryData(s.data);
// //       // setClientData(c.data);
// //       // setTransactionData(t.data);
// //       setSummaryData(s.status === "fulfilled" ? s.value.data : null);
// //       setClientData(c.status === "fulfilled" ? c.value.data : null);
// //       setTransactionData(t.status === "fulfilled" ? t.value.data : null);
// //     } catch (err) {
// //       console.error("Dashboard fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Initial load — no filters
// //   useEffect(() => {
// //     fetchAll("", "");
// //   }, []);

// //   const handleApply = () => {
// //     setAppliedFilters(filters);
// //     fetchAll(filters.fromDate, filters.toDate);
// //   };

// //   const handleReset = () => {
// //     const cleared = { fromDate: "", toDate: "" };
// //     setFilters(cleared);
// //     setAppliedFilters(cleared);
// //     fetchAll("", "");
// //   };

// //   const scrollToSection = (ref) => {
// //     ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
// //   };

// //   const sections = [
// //     { title: "Overview", icon: <FaChartPie size={13} />, ref: overviewRef },
// //     { title: "Clients", icon: <FaUsers size={13} />, ref: clientsRef },
// //     {
// //       title: "Transactions",
// //       icon: <FaMoneyBillWave size={13} />,
// //       ref: transactionsRef,
// //     },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-[#F6F8FB]">
// //       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

// //       <main className="flex-1 md:ml-[70px] min-h-screen">
// //         <Header title="Dashboard" />

// //         <div className="md:hidden px-4 mt-4 mb-4">
// //           <button
// //             onClick={() => setSidebarOpen(true)}
// //             className="w-11 h-11 rounded-xl bg-[#032A5C] text-white shadow-md flex items-center justify-center"
// //           >
// //             <FaBars size={16} />
// //           </button>
// //         </div>

// //         <div className="sticky top-0 z-50 py-4 px-4 md:px-6 lg:px-8">
// //           <DashboardToolbar
// //             sections={sections}
// //             scrollToSection={scrollToSection}
// //             filters={filters}
// //             setFilters={setFilters}
// //             onApply={handleApply}
// //             onReset={handleReset}
// //           />
// //         </div>

// //         <div className="px-4 md:px-6 lg:px-8 pb-8 space-y-8">
// //           <section ref={overviewRef}>
// //             <Summary data={summaryData} loading={loading} />
// //           </section>

// //           <section ref={clientsRef}>
// //             <Clients data={clientData} loading={loading} />
// //           </section>

// //           <section ref={transactionsRef}>
// //             <Transactions data={transactionData} loading={loading} />
// //           </section>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default DashboardPage;

import { useRef, useState, useEffect } from "react";
import { FaBars, FaChartPie, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import Sidebar from "../../client/components/Sidebar";
import Header from "../../auth/pages/Header";
import DashboardToolbar from "../components/DashboardToolbar";
import Summary from "../components/summary";
import Clients from "../components/clients";
import Transactions from "../components/Transactions";
import {
  getSummary,
  getClientSummary,
  getTransactionSummary,
} from "../services/dashboardServices";

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const overviewRef = useRef(null);
  const clientsRef = useRef(null);
  const transactionsRef = useRef(null);

  const [filters, setFilters] = useState({ fromDate: "", toDate: "" });

  const [summaryData, setSummaryData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async (fromDate, toDate) => {
    setLoading(true);
    try {
      const [s, c, t] = await Promise.allSettled([
        getSummary(fromDate, toDate),
        getClientSummary(fromDate, toDate),
        getTransactionSummary(fromDate, toDate),
      ]);
      console.log("Client result:", c); // ← add this

      setSummaryData(s.status === "fulfilled" ? s.value.data : null);
      setClientData(c.status === "fulfilled" ? c.value.data : null);
      setTransactionData(t.status === "fulfilled" ? t.value.data : null);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll("", "");
  }, []);

  const handleApply = () => {
    fetchAll(filters.fromDate, filters.toDate);
  };

  const handleReset = () => {
    setFilters({ fromDate: "", toDate: "" });
    fetchAll("", "");
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sections = [
    { title: "Overview", icon: <FaChartPie size={13} />, ref: overviewRef },
    { title: "Clients", icon: <FaUsers size={13} />, ref: clientsRef },
    {
      title: "Transactions",
      icon: <FaMoneyBillWave size={13} />,
      ref: transactionsRef,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 md:ml-[70px] min-h-screen">
        <Header title="Dashboard" />

        <div className="md:hidden px-4 mt-4 mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-11 h-11 rounded-xl bg-[#032A5C] text-white shadow-md flex items-center justify-center"
          >
            <FaBars size={16} />
          </button>
        </div>

        <div className="sticky top-0 z-50 py-4 px-4 md:px-6 lg:px-8">
          <DashboardToolbar
            sections={sections}
            scrollToSection={scrollToSection}
            filters={filters}
            setFilters={setFilters}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>

        <div className="px-4 md:px-6 lg:px-8 pb-8 space-y-8">
          <section ref={overviewRef}>
            <Summary data={summaryData} loading={loading} />
          </section>

          <section ref={clientsRef}>
            <Clients data={clientData} loading={loading} />
          </section>

          <section ref={transactionsRef}>
            <Transactions data={transactionData} loading={loading} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;