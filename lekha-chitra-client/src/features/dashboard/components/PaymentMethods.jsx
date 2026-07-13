import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#032A5C",
  "#E59C11",
  "#4CAF50",
  "#FF6B6B",
  "#7E57C2",
  "#26A69A",
];

const PaymentMethods = ({ paymentMethods }) => {
  const chartData = paymentMethods.map((item) => ({
    name: item.paymentMethod,
    value: Number(item.totalAmount),
    transactions: item.totalTransactions,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 h-full">
      <h3 className="text-sm font-semibold text-[#032A5C] mb-5">
        Payment Methods
      </h3>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={75}
              paddingAngle={3}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `Rs. ${Number(value).toLocaleString()}`}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />
          </PieChart>
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
              <span className="text-gray-700">{item.name}</span>
            </div>

            <span className="font-medium text-[#032A5C]">
              Rs. {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
