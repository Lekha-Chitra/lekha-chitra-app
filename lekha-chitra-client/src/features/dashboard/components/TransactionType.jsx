import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#032A5C",
  "#E59C11",
  "#4CAF50",
  "#FF6B6B",
  "#7E57C2",
  "#26A69A",
];

const TransactionType = ({ transactionTypes }) => {
  const chartData = transactionTypes.map((item) => ({
    name: item.transactionType,
    amount: Number(item.totalAmount),
    transactions: item.totalTransactions,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 h-full">
      <h3 className="text-sm font-semibold text-[#032A5C] mb-5">
        Transaction Types
      </h3>

      <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />

            <XAxis type="number" hide />

            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{
                fill: "#4B5563",
                fontSize: 13,
              }}
            />

            <Tooltip
              formatter={(value) => [
                `Rs. ${Number(value).toLocaleString()}`,
                "Amount",
              ]}
            />

            <Bar
              dataKey="amount"
              radius={[0, 8, 8, 0]}
              barSize={18}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="text-gray-700">
                {item.name}
                <span className="ml-2 text-xs text-gray-400">
                  ({item.transactions})
                </span>
              </span>
            </div>

            <span className="font-semibold text-[#032A5C]">
              Rs. {item.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionType;