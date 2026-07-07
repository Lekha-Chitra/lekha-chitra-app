import { CircleUser, LogOut, CalendarDays } from "lucide-react";

function Header({ title = "Dashboard" }) {
  return (
    <header className="bg-white border-b px-6 py-0 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-[#032A5C]">
          {title}
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back, manage your business efficiently.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarDays size={18} strokeWidth={1.5} />
          <span className="text-sm">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE]">
          <span className="text-xs font-medium text-[#185FA5]">
            FY 2082/83
          </span>
        </div>

        <CircleUser
          size={20}
          strokeWidth={1.5}
          className="text-gray-600 cursor-pointer"
        />

       
      </div>
    </header>
  );
}

export default Header;