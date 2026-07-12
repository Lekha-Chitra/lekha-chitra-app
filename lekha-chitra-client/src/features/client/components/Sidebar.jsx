import {
  FaChartBar,
  FaUser,
  FaPlusCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import {
  LogOut,
  User,
  CircleUser,
  LayoutGrid,
  Building2,
  Receipt,
  ChartColumn,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";

import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { logout } from "../../../app/logout";
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogout = async() => {
    try{
      await logout();
    
    navigate("/", { replace: true });
  }catch(error){
    console.error(error);
  };

}
  const menuItems = [
    {
      icon: (
        <ChartColumn size={20} strokeWidth={1.5} className="text-[#ffffff]" />
      ),
      label: "Analytics",
      path: "/analytics",
    },
    {
      icon: <Receipt size={20} strokeWidth={1.5} className="text-[#ffffff]" />,
      label: "Transactions",
      path: "/transactions",
    },

    {
      icon: (
        <Building2 size={20} strokeWidth={1.5} className="text-[#ffffff]" />
      ),
      label: "Client",
      path: "/clients",
    },
    // {
    //   icon: <FaPlusCircle size={30} />,
    //   label: "VAT Bill",
    //   path: "/dashboard",
    // },
    {
      icon: (
        <LayoutGrid size={20} strokeWidth={1.5} className="text-[#ffffff]" />
      ),
      label: "Category",
      path: "/category",
    },
    {
      icon: (
        <CircleUser size={20} strokeWidth={1.7} className="text-[#ffffff]" />
      ),
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          group

          bg-[#032A5C]
          text-white

          flex
          flex-col

          

          fixed
        

          top-0
          left-0
          h-screen

          z-50

          transition-all
          duration-300

          w-[180px]

          md:w-[70px]
          md:hover:w-[180px]

          overflow-hidden

          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Mobile Close */}
        <div className="md:hidden flex justify-end p-4  ">
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={30} />
          </button>
        </div>

        {/* Logo */}
        <div
          className="
            flex
            items-center
            px-3
            py-5
            border-b
            border-[#0B3B77]
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              overflow-hidden
              bg-white
              shrink-0
            "
          >
            <img
              src={logo}
              alt="logo"
              className="
                w-full
                h-full
                object-cover
              "
            />
          </div>

          <h2
            className="
              ml-2
              whitespace-nowrap

              opacity-100
              md:opacity-0

              md:group-hover:opacity-100

              transition-all
              duration-300
            "
          >
            <span className="text-[#ffffff] font-bold text-xl">लेखा</span>

            <span className="text-[#E59C11] font-bold text-xl">चित्र</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);

                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              className={`
                w-full

                flex
                items-center

                px-5
                py-3

                 hover:bg-[#0B3B77]
                 transition
                 cursor-pointer
                 
              
              `}
            >
              <span
                className="
                  text-[#E59C11]
                  shrink-0
                "
              >
                {item.icon}
              </span>

              <span
                className="
                  ml-3
                  whitespace-nowrap

                  opacity-100
                  md:opacity-0

                  md:group-hover:opacity-100

                  transition-all
                  duration-300
                "
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="pb-6">
          <button
            onClick={handleLogout}
            className="
              w-full

              flex
              items-center

              px-5
              py-0

              hover:bg-[#0B3B77]
              transition
              cursor-pointer
            "
          >
            <LogOut
              size={28}
              className="text-[#E59C11] shrink-0"
              strokeWidth={2.0}
            />
            <span
              className="
                ml-3
                whitespace-nowrap

                opacity-100
                md:opacity-0

                md:group-hover:opacity-100

                transition-all
                duration-300
              "
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
