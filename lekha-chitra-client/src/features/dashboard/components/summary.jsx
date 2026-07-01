import {useState, useEffect} from "react";
import { getSummary } from "../services/dashboardServices";
function Summary() {
  const [summary, setSummary] = useState({
    totalClients: 0,
    currentBalance: 0,
    creditAmount: 0,
    debitAmount: 0,
  });
  const [loading, setLoading] = useState(true);


const cards = [
  {
    title: "Total Clients",
    value: summary.totalClients,
    sub: "Active accounts",
    accent: "#032A5C",
    bg: "#EEF4FF",
  },
  {
    title: "Current Balance",
    value: `Rs. ${summary.currentBalance}`,
    sub: "Net position",
    accent: "#E59C11",
    bg: "#FFF8E6",
  },
  {
    title: "Credit Amount",
    value: `Rs. ${summary.creditAmount}`,
    sub: "Total inflow",
    accent: "#16A34A",
    bg: "#ECFDF5",
  },
  {
    title: "Debit Amount",
    value: `Rs. ${summary.debitAmount}`,
    sub: "Total outflow",
    accent: "#DC2626",
    bg: "#FEF2F2",
  },
];

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

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#032A5C]">Summary</h2>
        <div className="h-1 w-12 rounded-full bg-[#E59C11]" />
      </div>

      <div className="grid grid-cols-4 gap-2.5">
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
              <span className="inline-block w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: card.accent }} />
              {card.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Summary;