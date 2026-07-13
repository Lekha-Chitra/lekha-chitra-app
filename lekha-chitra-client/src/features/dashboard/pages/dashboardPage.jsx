// // import { useRef, useState } from "react";
// // import {
// //   FaBars,
// //   FaChartPie,
// //   FaUsers,
// //   FaMoneyBillWave,
// //   FaFilter,
// // } from "react-icons/fa";

// // import Summary from "../components/summary";
// // import Clients from "../components/clients";
// // import Sidebar from "../../client/components/Sidebar";
// // import Header from "../../auth/pages/Header";
// // import Transactions from "../components/Transactions";

// // function DashboardPage() {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   const overviewRef = useRef(null);
// //   const clientsRef = useRef(null);
// //   const transactionsRef = useRef(null);

// //   const [filters, setFilters] = useState({
// //     fromDate: "",
// //     toDate: "",
// //   });

// //   const scrollToSection = (ref) => {
// //     ref.current?.scrollIntoView({
// //       behavior: "smooth",
// //       block: "start",
// //     });
// //   };

// //   const sections = [
// //     {
// //       title: "Overview",
// //       icon: <FaChartPie size={13} />,
// //       ref: overviewRef,
// //     },
// //     {
// //       title: "Clients",
// //       icon: <FaUsers size={13} />,
// //       ref: clientsRef,
// //     },
// //     {
// //       title: "Transactions",
// //       icon: <FaMoneyBillWave size={13} />,
// //       ref: transactionsRef,
// //     },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-[#F6F8FB]">
// //       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

// //       <main
// //         className="
// //           flex-1
// //           md:ml-[70px]
// //           min-h-screen
// //           overflow-y-auto

// //           overflow-x-hidden
// //           p-4
// //           md:p-6
// //           lg:p-8
// //           transition-all
// //         duration-300
// //         "
// //       >

// //           <Header title="Dashboard" />

// //         {/* Mobile Menu */}
// //         <div className="md:hidden mt-4 mb-5">
// //           <button
// //             onClick={() => setSidebarOpen(true)}
// //             className="bg-[#032A5C] text-white p-3 rounded-lg shadow"
// //           >
// //             <FaBars size={14} />
// //           </button>
// //         </div>

// //         {/* Navigation + Filters */}
// //         <div className="sticky top-0 z-20 bg-[#F6F8FB] py-2 mb-6">
// //           <div className="flex flex-wrap items-center justify-between gap-3">
// //             {/* Navigation */}
// //             <div className="flex flex-wrap items-center gap-2 flex-1">
// //               {sections.map((section) => (
// //                 <button
// //                   key={section.title}
// //                   onClick={() => scrollToSection(section.ref)}
// //                   className="
// //             flex
// //             items-center
// //             gap-1.5
// //             px-3
// //             py-1.5
// //             rounded-full
// //             bg-white
// //             border
// //             border-gray-200
// //             text-xs
// //             font-medium
// //             text-gray-700
// //             shadow-sm
// //             hover:bg-[#032A5C]
// //             hover:text-white
// //             hover:border-[#032A5C]
// //             transition-all
// //             duration-200
// //           "
// //                 >
// //                   {section.icon}
// //                   <span>{section.title}</span>
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Filters */}
// //             <div
// //               className="
// //         flex
// //         flex-wrap
// //         items-center
// //         gap-2
// //         bg-white
// //         border
// //         border-gray-200
// //         rounded-xl
// //         shadow-sm
// //         p-2.5
// //       "
// //             >
// //               <FaFilter className="text-[#032A5C] text-sm" />

// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs text-gray-500 whitespace-nowrap">
// //                   From
// //                 </span>
// //                 <input
// //                   type="date"
// //                   value={filters.fromDate}
// //                   onChange={(e) =>
// //                     setFilters((prev) => ({
// //                       ...prev,
// //                       fromDate: e.target.value,
// //                     }))
// //                   }
// //                   className="
// //             w-32
// //             border
// //             border-gray-300
// //             rounded-md
// //             px-2
// //             py-1
// //             text-xs
// //             focus:outline-none
// //             focus:border-[#032A5C]
// //           "
// //                 />
// //               </div>

// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs text-gray-500 whitespace-nowrap">
// //                   To
// //                 </span>
// //                 <input
// //                   type="date"
// //                   value={filters.toDate}
// //                   onChange={(e) =>
// //                     setFilters((prev) => ({
// //                       ...prev,
// //                       toDate: e.target.value,
// //                     }))
// //                   }
// //                   className="
// //             w-32
// //             border
// //             border-gray-300
// //             rounded-md
// //             px-2
// //             py-1
// //             text-xs
// //             focus:outline-none
// //             focus:border-[#032A5C]
// //           "
// //                 />
// //               </div>

// //               <button
// //                 className="
// //           px-3
// //           py-1.5
// //           rounded-md
// //           bg-[#032A5C]
// //           text-white
// //           text-xs
// //           font-medium
// //           hover:bg-[#021d40]
// //           transition
// //         "
// //               >
// //                 Apply
// //               </button>

// //               <button
// //                 className="
// //           px-3
// //           py-1.5
// //           rounded-md
// //           border
// //           border-[#032A5C]
// //           text-[#032A5C]
// //           text-xs
// //           font-medium
// //           hover:bg-[#032A5C]
// //           hover:text-white
// //           transition
// //         "
// //               >
// //                 Reset
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="space-y-6">
// //           <section ref={overviewRef}>
// //             <Summary />
// //           </section>

// //           <section ref={clientsRef}>
// //             <Clients />
// //           </section>

// //           <section
// //             ref={transactionsRef}
// //             className="
// //               bg-white
// //               rounded-xl
// //               shadow-sm
// //               border
// //               border-gray-100
// //               p-6
// //             "
// //           >
// //             {/* <h2 className="text-xl font-semibold text-[#032A5C]">
// //               Transaction Analytics
// //             </h2> */}

// //             {/* <p className="mt-2 text-sm text-gray-500">
// //               Transaction analytics will appear here.
// //             </p> */}
// //             <Transactions />
// //           </section>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default DashboardPage;

// import { useRef, useState } from "react";
// import {
//   FaBars,
//   FaChartPie,
//   FaUsers,
//   FaMoneyBillWave,
//   FaFilter,
// } from "react-icons/fa";

// import Summary from "../components/summary";
// import Clients from "../components/clients";
// import Transactions from "../components/Transactions";

// import Sidebar from "../../client/components/Sidebar";
// import Header from "../../auth/pages/Header";
// import DashboardToolbar from "../components/DashboardToolbar";

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

//   return (
//     <div className="flex min-h-screen bg-[#F6F8FB]">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <main className="flex-1 md:ml-[70px] min-h-screen">
//         {/* ================= FIXED TOP ================= */}

//         <div
//           className="
//             fixed
//             top-0

//             left-[70px]
//             right-0
//             z-40
//             bg-[#F6F8FB]
//             border-b
//             shadow-sm
//           "
//         >
//           <Header title="Dashboard" />

//           {/* Toolbar */}

//           <div className="px-6 pb-4 pt-2">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               {/* Navigation */}

//               <div className="flex flex-wrap gap-2 w-full lg:w-auto">
//                 {sections.map((section) => (
//                   <button
//                     key={section.title}
//                     onClick={() => scrollToSection(section.ref)}
//                     className="
//                       flex
//                       items-center
//                       gap-2
//                       px-3
//                       py-2
//                       rounded-full
//                       bg-white
//                       border
//                       border-gray-200
//                       text-xs
//                       font-medium
//                       text-gray-700
//                       shadow-sm
//                       hover:bg-[#032A5C]
//                       hover:text-white
//                       transition
//                     "
//                   >
//                     {section.icon}
//                     {section.title}
//                   </button>
//                 ))}
//               </div>

//               {/* Filters */}

//               <div
//                 className="
//                     grid
//     grid-cols-1
//     sm:grid-cols-2
//     lg:flex
//     items-center
//     gap-2
//     bg-white
//     rounded-xl
//     border
//     border-gray-200
//     shadow-sm
//     p-3
//     w-full
//     lg:w-auto
//                 "
//               >
//                 <FaFilter className="text-[#032A5C]" />

//                 <span className="text-xs">From</span>

//                 <input
//                   type="date"
//                   value={filters.fromDate}
//                   onChange={(e) =>
//                     setFilters({
//                       ...filters,
//                       fromDate: e.target.value,
//                     })
//                   }
//                   className="
//                     border
//                     rounded-md
//                     px-2
//                     py-1
//                     text-xs
//                   "
//                 />

//                 <span className="text-xs">To</span>

//                 <input
//                   type="date"
//                   value={filters.toDate}
//                   onChange={(e) =>
//                     setFilters({
//                       ...filters,
//                       toDate: e.target.value,
//                     })
//                   }
//                   className="
//                     border
//                     rounded-md
//                     px-2
//                     py-1
//                     text-xs
//                   "
//                 />

//                 <button
//                   className="
//                     bg-[#032A5C]
//                     text-white
//                     text-xs
//                     px-3
//                     py-1.5
//                     rounded-md
//                   "
//                 >
//                   Apply
//                 </button>

//                 <button
//                   className="
//                     border
//                     border-[#032A5C]
//                     text-[#032A5C]
//                     text-xs
//                     px-3
//                     py-1.5
//                     rounded-md
//                   "
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= MOBILE MENU ================= */}

//         <div className="md:hidden fixed top-4 left-4 z-50">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="bg-[#032A5C] text-white p-3 rounded-lg shadow"
//           >
//             <FaBars size={15} />
//           </button>
//         </div>

//         {/* ================= SCROLL CONTENT ================= */}

//         <div
//           className="
//             pt-[180px]
//             px-4
//             md:px-6
//             lg:px-8
//             pb-8
//             space-y-6
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

import { useRef, useState } from "react";
import { FaBars, FaChartPie, FaUsers, FaMoneyBillWave } from "react-icons/fa";

import Sidebar from "../../client/components/Sidebar";
import Header from "../../auth/pages/Header";

import DashboardToolbar from "../components/DashboardToolbar";

import Summary from "../components/summary";
import Clients from "../components/clients";
import Transactions from "../components/Transactions";

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

  const handleApply = () => {
    console.log(filters);
  };

  const handleReset = () => {
    setFilters({
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className="
          flex-1
          md:ml-[70px]
          min-h-screen
          
        "
      >
        {/* ===================== Fixed Header ===================== */}

        {/* <div
          className="
            fixed
            top-0
            left-0
            md:left-[70px]
            right-0
            z-40
            bg-[#F6F8FB]
          "
        >
          <Header title="Dashboard" />

          <div className="px-4 md:px-6 lg:px-8 pb-4">
            <DashboardToolbar
              sections={sections}
              scrollToSection={scrollToSection}
              filters={filters}
              setFilters={setFilters}
              onApply={handleApply}
              onReset={handleReset}
            />
          </div>
        </div> */}
        <Header title="Dashboard" />

        {/* ===================== Mobile Menu ===================== */}

        {/* <div className="md:hidden fixed left-4 top-4 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#032A5C] text-white p-3 rounded-lg shadow"
          >
            <FaBars size={15} />
          </button>
        </div> */}
        <div className="md:hidden px-4 mt-4 mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="
      w-11
      h-11
      rounded-xl
      bg-[#032A5C]
      text-white
      shadow-md
      flex
      items-center
      justify-center
    "
          >
            <FaBars size={16} />
          </button>
        </div>

        <div className="sticky top-0 z-50  py-4 px-4 md:px-6 lg:px-8">
          <DashboardToolbar
            sections={sections}
            scrollToSection={scrollToSection}
            filters={filters}
            setFilters={setFilters}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>

        {/* ===================== Scrollable Content ===================== */}

        <div
          className="
        
            px-4
            md:px-6
            lg:px-8
            pb-8
            space-y-8
          "
        >
          <section ref={overviewRef}>
            <Summary />
          </section>

          <section ref={clientsRef}>
            <Clients />
          </section>

          <section ref={transactionsRef}>
            <Transactions />
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;