import { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa6";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import { getSummary } from "../services/dashboardServices";

function Summary() {
  const [summary, setSummary] = useState({
    totalClients: 0,
    currentBalance: 0,
    creditAmount: 0,
    debitAmount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);

      const response = await getSummary();

      setSummary(response.data);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-44 bg-white rounded-2xl border border-gray-200 animate-pulse" />
    );
  }

  const cards = [
    {
      title: "Current Balance",
      value: summary.currentBalance,
      subtitle: "Net Position",
      icon: <FaWallet />,
      color: "#032A5C",
    },
    {
      title: "Credit Amount",
      value: summary.creditAmount,
      subtitle: "Total Inflow",
      icon: <FaArrowTrendUp />,
      color: "#16A34A",
    },
    {
      title: "Debit Amount",
      value: summary.debitAmount,
      subtitle: "Total Outflow",
      icon: <FaArrowTrendDown />,
      color: "#E59C11",
    },
  ];

  return (
    <section className="mb-8">
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
           

            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">
                    {card.title}
                  </p>

                  <h2
                    className="mt-3 text-xl font-bold"
                    style={{ color: card.color }}
                  >
                    Rs. {Number(card.value).toLocaleString()}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {card.subtitle}
                  </p>
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

            {/* Accent Bar */}
            <div
              className="absolute bottom-0 left-0 h-1 w-full"
              style={{
                background: `linear-gradient(to right, ${card.color}, transparent)`,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Summary;