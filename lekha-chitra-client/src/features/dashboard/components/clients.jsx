import { useState, useEffect } from "react";
import { getClientSummary } from "../services/dashboardServices";
import { FaChartLine } from "react-icons/fa6";
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
  //  const [data, setData] = useState(null);
  const [data, setData] = useState({
    totalClients: 0,
    totalCreditClients: 0,
    totalDebitClients: 0,
    totalBalance: 0,
    highestBalance: 0,
    lowestBalance: 0,
    averageBalance: 0,
    clientGrowth: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientSummary();
  }, []);

  const loadClientSummary = async () => {
    try {
      const response = await getClientSummary();
      // console.log(response);
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
      tone: lowestBalance < 0 ? "text-red-600" : "text-gray-700",
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Growth chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-semibold text-[#032A5C]">
              Client Growth
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={clientGrowth}>
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#032A5C" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#032A5C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
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
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #f0f0f0",
                  fontSize: 12,
                }}
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
          <div className=" pt-1 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-[#032A5C] mb-4">
              Client Distribution
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">
                {totalClients} total
              </span>
              <div className="flex gap-3">
                <span className="text-xs font-medium text-[#032A5C]">
                  ● {totalCreditClients} credit
                </span>
                <span className="text-xs font-medium text-[#E59C11]">
                  ● {totalDebitClients} debit
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden flex">
              <div
                className="h-full"
                style={{
                  width: `${(totalCreditClients / totalClients) * 100 || 0}%`,
                  backgroundColor: "#032A5C",
                }}
              />
              <div
                className="h-full"
                style={{
                  width: `${(totalDebitClients / totalClients) * 100 || 0}%`,
                  backgroundColor: "#E59C11",
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-gray-400">
                {((totalCreditClients / totalClients) * 100 || 0).toFixed(1)}%
              </span>
              <span className="text-[11px] text-gray-400">
                {((totalDebitClients / totalClients) * 100 || 0).toFixed(1)}%
              </span>
            </div>
          </div>
          <h3 className="text-sm font-semibold text-[#032A5C] mt-5 mb-4">
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
                  Rs. {Number(stat.value ?? 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
