import { useState, useEffect } from "react";
import {getClientSummary }from "../services/dashboardServices";
import {
  FaChartLine,
} from "react-icons/fa6";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Clients() {
 const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientSummary();
  }, []);

  const loadClientSummary = async () => {
    try {
      const response = await getClientSummary();
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    totalClients,
    totalCreditClients,
    totalDebitClients,
    totalBalance,
    highestBalance,
    lowestBalance,
    averageBalance,
    clientGrowth,
  } = data;

  const cards = [
    {
      title: "Total Clients",
      value: totalClients,
      sub: "All accounts",
      accent: "#032A5C",
    },
    {
      title: "Credit Clients",
      value: totalCreditClients,
      sub: "Positive balance",
      accent: "#16A34A",
    },
    {
      title: "Debit Clients",
      value: totalDebitClients,
      sub: "Negative balance",
      accent: "#DC2626",
    },
    {
      title: "Total Balance",
      value: `Rs. ${totalBalance.toLocaleString()}`,
      sub: "Net position",
      accent: "#E59C11",
    },
  ];

  const balanceStats = [
    {
      label: "Highest Balance",
      value: highestBalance,
      tone: "text-green-600",
    },
    {
      label: "Average Balance",
      value: averageBalance,
      tone: "text-[#032A5C]",
    },
    {
      label: "Lowest Balance",
      value: lowestBalance,
      tone:
        lowestBalance < 0 ? "text-red-600" : "text-gray-700",
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#032A5C]">Client Analytics</h2>
        <div className="h-1 w-12 rounded-full bg-[#E59C11]" />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-2.5 mb-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative bg-white rounded-[10px] border border-gray-100 hover:border-gray-200 transition-all duration-200 overflow-hidden py-2.5 pr-3 pl-4"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{ backgroundColor: card.accent }}
            />

            <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-1.5">
              {card.title}
            </p>

            <h3
              className="text-[17px] font-semibold leading-tight truncate"
              style={{ color: card.accent }}
            >
              {card.value}
            </h3>

            <p className="mt-1 text-[11px] text-gray-400 flex items-center gap-1">
              <span
                className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: card.accent }}
              />
              {card.sub}
            </p>
            {/* <div
              className="absolute -top-5 -right-5 w-14 h-14 rounded-full opacity-10"
              style={{ backgroundColor: card.accent }}
            /> */}
          </div>
          
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Growth chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <FaChartLine className="text-[#E59C11]" size={16} />
            <h3 className="text-sm font-semibold text-[#032A5C]">Client Growth</h3>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={clientGrowth}>
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#032A5C" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#032A5C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="monthName"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #f0f0f0", fontSize: 12 }}
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload
                    ? `${payload[0].payload.monthName} ${payload[0].payload.year}`
                    : label
                }
              />
              <Area
                type="monotone"
                dataKey="totalClients"
                stroke="#032A5C"
                strokeWidth={2}
                fill="url(#growthFill)"
                dot={{ r: 4, fill: "#032A5C" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Balance breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
          <h3 className="text-sm font-semibold text-[#032A5C] mb-4">
            Balance Breakdown
          </h3>
          <div className="space-y-4">
            {balanceStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-gray-50 last:border-0 pb-3 last:pb-0"
              >
                <span className="text-xs text-gray-500">{stat.label}</span>
                <span className={`text-sm font-bold ${stat.tone}`}>
                  Rs. {stat.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Credit vs Debit Clients</p>
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden flex">
              <div
                className="h-full bg-green-500"
                style={{ width: `${(totalCreditClients / totalClients) * 100 || 0}%` }}
              />
              <div
                className="h-full bg-red-500"
                style={{ width: `${(totalDebitClients / totalClients) * 100 || 0}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-gray-400">
              <span>{totalCreditClients} Credit</span>
              <span>{totalDebitClients} Debit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;