import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineLineChart } from "react-icons/ai";
import type { RecentRecord } from "./RecentRecord";

const RecordItem: React.FC<{ item: RecentRecord }> = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (item.route === "/despesas") {
      navigate(item.route, {
        state: { targetExpenseType: item.type },
      });
      return;
    }

    navigate(item.route, { state: { targetTab: item.label ?? item.type ?? "Registro Produtores" } });
  };

  const [mainText, subText] = item.details.includes("–")
    ? item.details.split("–").map((s) => s.trim())
    : [item.details, null];

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <AiOutlineLineChart className={`w-6 h-6 ${item.iconBgColor}`} />

        <div className="text-gray-900 font-medium">
          {item.label ?? item.type}:
          <span className="ml-1 text-sm font-normal">
            {mainText}
            {subText && (
              <span className="text-gray-600 ml-1 font-medium">{subText}</span>
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

export default RecordItem;
