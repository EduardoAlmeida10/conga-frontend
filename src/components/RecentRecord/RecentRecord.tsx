import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLineChart, AiOutlineArrowRight } from "react-icons/ai";
import { RECENT_RECORDS, type RecentRecord } from "./mock";

const RecordItem: React.FC<{ item: RecentRecord }> = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (item.route === "/despesas" && item.description) {
      navigate(item.route, {
        state: { targetExpenseType: item.description },
      });
    } else {
      const statePayload = {
        targetTab: "Registro Produtores",
      };

      navigate(item.route, { state: statePayload });
    }
  };

  const [mainText, subText] = item.details.includes("–")
    ? item.details.split(" – ").map((s) => s.trim())
    : [item.details, null];

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <AiOutlineLineChart className={`w-6 h-6 ${item.iconBgColor}`} />

        <div className="text-gray-900 font-medium">
          {item.description}:
          <span className="ml-1 text-sm font-normal">
            {mainText}
            {subText && (
              <span className="text-gray-600 ml-1 font-medium">{subText}</span>
            )}
            {!subText && (
              <span className="text-gray-600 ml-1 font-medium"> {subText}</span>
            )}
          </span>
        </div>
      </div>

      <button
        onClick={handleNavigation}
        className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150 text-sm font-medium cursor-pointer"
      >
        Ver Mais
        <AiOutlineArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

const RecentRecords: React.FC = () => {
  const records = RECENT_RECORDS;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Últimos Registros Cadastrados
      </h3>

      <div className="divide-y divide-gray-100">
        {records.map((item) => (
          <RecordItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentRecords;
