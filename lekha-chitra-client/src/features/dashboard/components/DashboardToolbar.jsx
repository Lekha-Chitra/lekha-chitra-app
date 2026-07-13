// import { FaChartPie, FaUsers, FaMoneyBillWave, FaFilter } from "react-icons/fa";

// function DashboardToolbar({
//   sections,
//   scrollToSection,
//   filters,
//   setFilters,
//   onApply,
//   onReset,
// }) {
//   return (
//     <div
//       className="
//         sticky
//         top-20
//         z-40
//         bg-[#F6F8FB]
//         pb-4
//       "
//     >
//       <div
//         className="
//           bg-white
//           rounded-2xl
//           border
//           border-gray-200
//           shadow-sm

//           p-4
//           md:p-5
//         "
//       >
//         <div
//           className="
//             flex
//             flex-col
//             xl:flex-row
//             xl:items-center
//             xl:justify-between
//             gap-5
//           "
//         >
//           {/* Navigation */}
//           <div className="flex flex-wrap gap-2">
//             {sections.map((section) => (
//               <button
//                 key={section.title}
//                 onClick={() => scrollToSection(section.ref)}
//                 className="
//                   flex
//                   items-center
//                   gap-2

//                   px-4
//                   py-2

//                   rounded-full

//                   bg-[#F8FAFC]
//                   border
//                   border-gray-200

//                   text-sm
//                   font-medium
//                   text-gray-700

//                   hover:bg-[#032A5C]
//                   hover:text-white
//                   hover:border-[#032A5C]

//                   transition-all
//                 "
//               >
//                 {section.icon}
//                 {section.title}
//               </button>
//             ))}
//           </div>

//           {/* Filters */}
//           <div
//             className="
//               flex
//               flex-wrap
//               items-end
//               gap-3
//             "
//           >
//             <div className="flex items-center gap-2">
//               <FaFilter className="text-[#032A5C]" />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-xs text-gray-500 mb-1">From</label>

//               <input
//                 type="date"
//                 value={filters.fromDate}
//                 onChange={(e) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     fromDate: e.target.value,
//                   }))
//                 }
//                 className="
//                   border
//                   border-gray-300
//                   rounded-lg
//                   px-3
//                   py-2
//                   text-sm
//                   focus:outline-none
//                   focus:border-[#032A5C]
//                 "
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-xs text-gray-500 mb-1">To</label>

//               <input
//                 type="date"
//                 value={filters.toDate}
//                 onChange={(e) =>
//                   setFilters((prev) => ({
//                     ...prev,
//                     toDate: e.target.value,
//                   }))
//                 }
//                 className="
//                   border
//                   border-gray-300
//                   rounded-lg
//                   px-3
//                   py-2
//                   text-sm
//                   focus:outline-none
//                   focus:border-[#032A5C]
//                 "
//               />
//             </div>

//             <button
//               onClick={onApply}
//               className="
//                 h-[42px]
//                 px-5

//                 rounded-lg

//                 bg-[#032A5C]
//                 text-white

//                 text-sm
//                 font-medium

//                 hover:bg-[#021d40]
//                 transition
//               "
//             >
//               Apply
//             </button>

//             <button
//               onClick={onReset}
//               className="
//                 h-[42px]
//                 px-5

//                 rounded-lg

//                 border
//                 border-[#032A5C]

//                 text-[#032A5C]

//                 text-sm
//                 font-medium

//                 hover:bg-[#032A5C]
//                 hover:text-white

//                 transition
//               "
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardToolbar;

import { FaFilter } from "react-icons/fa";

function DashboardToolbar({
  sections,
  scrollToSection,
  filters,
  setFilters,
  onApply,
  onReset,
}) {
  return (
    <div
      className="
        sticky
        top-0
        z-30
        bg-[#F6F8FB]
        py-4
        backdrop-blur-md
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          shadow-lg
          p-4
          md:p-5
        "
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
          {/* Navigation */}
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.title}
                onClick={() => scrollToSection(section.ref)}
                className="
                  flex
                  items-center
                  gap-2
                  px-2
                  py-1
                  rounded-full
                  bg-[#F8FAFC]
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-[#032A5C]
                  hover:text-white
                  hover:border-[#032A5C]
                  transition-all
                "
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div
            className="
              w-full
              lg:w-auto

              grid
              grid-cols-1
              sm:grid-cols-2
              lg:flex

              gap-3
              items-end
            "
          >
            {/* Filter Icon */}
            <div
              className="
                hidden
                lg:flex
                items-center
                justify-center
                h-[42px]
                px-2
              "
            >
              <FaFilter className="text-[#032A5C]" />
            </div>

            {/* From */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">From</label>

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
                  w-full
                  sm:w-full
                  lg:w-34

                  border
                  border-gray-300
                  rounded-lg
                  px-3
                  py-1.5
                  text-sm

                  focus:outline-none
                  focus:border-[#032A5C]
                "
              />
            </div>

            {/* To */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">To</label>

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
                  w-full
                  sm:w-full
                  lg:w-34

                  border
                  border-gray-300
                  rounded-lg
                  px-3
                  py-1.5
                  text-sm

                  focus:outline-none
                  focus:border-[#032A5C]
                "
              />
            </div>

            {/* Buttons */}
            <div
              className="
                flex
                gap-2
                sm:col-span-2
                lg:col-span-1
              "
            >
              <button
                onClick={onApply}
                className="
                  flex-1
                  lg:flex-none

                  h-[34px]
                  px-5

                  rounded-lg
                  bg-[#032A5C]
                  text-white
                  text-sm
                  font-medium

                  hover:bg-[#021d40]
                  transition
                "
              >
                Apply
              </button>

              <button
                onClick={onReset}
                className="
                  flex-1
                  lg:flex-none

                  h-[34px]
                  px-5

                  rounded-lg

                  border
                  border-[#032A5C]

                  text-[#032A5C]
                  text-sm
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
      </div>
    </div>
  );
}

export default DashboardToolbar;