import logo from "../../../assets/images/logo.png";

function Home() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Lekhachitra"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h1 className="text-xl font-bold text-[#032A4E]">लेखाचित्र</h1>

            <p className="text-sm text-gray-500">Audit. Build. Grow.</p>
          </div>
        </div>

        <button
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-red-600
          "
        >
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <main className="p-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-[#032A4E] mb-3">
            Welcome to LekhaChitra 👋
          </h2>

          <p className="text-gray-600 text-lg">
            Manage construction expenses, track project costs, monitor budgets,
            and generate financial reports from one centralized platform.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Projects</h3>
            <p className="text-3xl font-bold text-[#032A4E] mt-2">12</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Active Projects</h3>
            <p className="text-3xl font-bold text-[#032A4E] mt-2">8</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Monthly Expense</h3>
            <p className="text-3xl font-bold text-[#032A4E] mt-2">Rs. 0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Pending Bills</h3>
            <p className="text-3xl font-bold text-[#032A4E] mt-2">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
