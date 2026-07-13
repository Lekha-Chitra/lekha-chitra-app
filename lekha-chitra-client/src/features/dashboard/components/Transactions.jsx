import { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { getTransactionSummary } from "../services/dashboardServices";

function Transactions() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    totalTransactions: 0,
    totalTransactionAmount: 0,
    averageTransactionAmount: 0,
    highestTransactionAmount: 0,
    lowestTransactionAmount: 0,

    totalCreditTransactions: 0,
    totalDebitTransactions: 0,

    totalCreditAmount: 0,
    totalDebitAmount: 0,

    transactionGrowth: [],
    transactionTypes: [],
    paymentMethods: [],
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await getTransactionSummary();

      console.log(response);

      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 bg-white rounded-2xl border border-gray-200 animate-pulse" />
    );
  }

  const cards = [
    {
      title: "Transactions",
      value: data.totalTransactions,
      subtitle: "All Transactions",
      icon: <FaMoneyBillWave />,
      color: "#032A5C",
      prefix: "",
    },
    {
      title: "Transaction Amount",
      value: data.totalTransactionAmount,
      subtitle: "Total Amount",
      icon: <FaArrowTrendUp />,
      color: "#16A34A",
      prefix: "Rs. ",
    },
    {
      title: "Average Transaction",
      value: data.averageTransactionAmount,
      subtitle: "Per Transaction",
      icon: <FaArrowTrendDown />,
      color: "#E59C11",
      prefix: "Rs. ",
    },
  ];

  const breakdown = [
    {
      label: "Highest Transaction",
      value: data.highestTransactionAmount,
      color: "text-green-600",
    },
    {
      label: "Average Transaction",
      value: data.averageTransactionAmount,
      color: "text-[#032A5C]",
    },
    {
      label: "Lowest Transaction",
      value: data.lowestTransactionAmount,
      color: "text-red-600",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Cards */}

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: `repeat(${cards.length}, minmax(0,1fr))`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-white
              border
              border-gray-200
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="uppercase text-xs tracking-widest text-gray-500 font-semibold">
                    {card.title}
                  </p>

                  <h2
                    className="mt-3 text-2xl font-bold"
                    style={{
                      color: card.color,
                    }}
                  >
                    {card.prefix}
                    {Number(card.value).toLocaleString()}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">{card.subtitle}</p>
                </div>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${card.color}15`,
                  }}
                >
                  <span
                    className="text-xl"
                    style={{
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 h-1 w-full"
              style={{
                background: `linear-gradient(to right, ${card.color}, transparent)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Graph */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#032A5C] mb-5">
            Transaction Growth
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.transactionGrowth}>
              <defs>
                <linearGradient id="transactionFill">
                  <stop offset="0%" stopColor="#032A5C" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#032A5C" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />

              <XAxis
                dataKey="monthName"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis axisLine={false} tickLine={false} allowDecimals={false} />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="totalTransactions"
                stroke="#032A5C"
                fill="url(#transactionFill)"
                strokeWidth={2}
                dot={{
                  fill: "#032A5C",
                  r: 4,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#032A5C]">
            Transaction Distribution
          </h3>

          <div className="mt-5">
            <div className="flex justify-between text-xs">
              <span>{data.totalTransactions} total</span>

              <div className="flex gap-3">
                <span className="text-[#032A5C]">
                  ● {data.totalCreditTransactions} Credit
                </span>

                <span className="text-[#E59C11]">
                  ● {data.totalDebitTransactions} Debit
                </span>
              </div>
            </div>

            <div className="w-full h-2 rounded-full overflow-hidden bg-gray-100 flex mt-3">
              <div
                className="bg-[#032A5C]"
                style={{
                  width: `${
                    (data.totalCreditTransactions / data.totalTransactions) *
                      100 || 0
                  }%`,
                }}
              />

              <div
                className="bg-[#E59C11]"
                style={{
                  width: `${
                    (data.totalDebitTransactions / data.totalTransactions) *
                      100 || 0
                  }%`,
                }}
              />
            </div>
          </div>

          <h3 className="text-sm font-semibold text-[#032A5C] mt-8 mb-5">
            Amount Breakdown
          </h3>

          <div className="space-y-4">
            {breakdown.map((item) => (
              <div
                key={item.label}
                className="flex justify-between border-b border-gray-100 pb-3"
              >
                <span className="text-sm text-gray-500">{item.label}</span>

                <span className={`font-bold ${item.color}`}>
                  Rs. {Number(item.value).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Types */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#032A5C] mb-5">
            Transaction Types
          </h3>

          <div className="space-y-4">
            {data.transactionTypes.map((item) => (
              <div
                key={item.transactionType}
                className="flex justify-between items-center border-b border-gray-100 pb-3"
              >
                <div>
                  <p className="font-medium text-gray-700">
                    {item.transactionType}
                  </p>

                  <p className="text-xs text-gray-400">
                    {item.totalTransactions} Transactions
                  </p>
                </div>

                <span className="font-bold text-[#032A5C]">
                  Rs. {Number(item.totalAmount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#032A5C] mb-5">
            Payment Methods
          </h3>

          <div className="space-y-4">
            {data.paymentMethods.map((item) => (
              <div
                key={item.paymentMethod}
                className="flex justify-between items-center border-b border-gray-100 pb-3"
              >
                <div>
                  <p className="font-medium text-gray-700">
                    {item.paymentMethod}
                  </p>

                  <p className="text-xs text-gray-400">
                    {item.totalTransactions} Transactions
                  </p>
                </div>

                <span className="font-bold text-[#032A5C]">
                  Rs. {Number(item.totalAmount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transactions;
