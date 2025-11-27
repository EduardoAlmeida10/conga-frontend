import type { OverviewSectionProps } from "@/types/OverviewSection.types";
import OverviewCard from "./OverviewCard";

const OverviewSection: React.FC<OverviewSectionProps> = ({
  cards,
  lastUpdated,
  title,
}) => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-start gap-8">
          {cards.map((data) => (
            <OverviewCard
              key={data.id}
              icon={data.icon}
              title={data.title}
              value={data.value}
              iconBgColor={data.iconBgColor}
            />
          ))}
        </div>

        {lastUpdated && (
          <>
            <hr className="my-6 border-gray-200" />
            <p className="text-sm text-gray-500">
              Última Atualização: {lastUpdated}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewSection;

// import OverviewCard from "./OverviewCard";

// import { AiOutlineAreaChart } from "react-icons/ai";
// import { FaDollarSign } from "react-icons/fa";

// export type OverviewMetrics = {
//   dailyAverage: number;
//   monthlyTotal: number;
//   milkPrice: number;
//   lastUpdated: string;
//   totalLiters: number;
// };

// type OverviewSectionProps = {
//   metrics: OverviewMetrics;
// };

// const OverviewSection: React.FC<OverviewSectionProps> = ({ metrics }) => {
//   const formatCurrency = (value: number | undefined | null) => {
//     const numValue = typeof value === "number" && !isNaN(value) ? value : 0;
//     return numValue.toLocaleString("pt-BR", {
//       style: "currency",
//       currency: "BRL",
//     });
//   };

//   const cardData = [
//     {
//       icon: AiOutlineAreaChart,
//       title: "Receita Diária Média",
//       value: formatCurrency(metrics.dailyAverage),
//       iconBgColor: "bg-blue-500",
//     },
//     {
//       icon: AiOutlineAreaChart,
//       title: "Receita Total Mensal",
//       value: formatCurrency(metrics.monthlyTotal),
//       iconBgColor: "bg-blue-500",
//     },
//     {
//       icon: FaDollarSign,
//       title: "Preço do Leite",
//       value: formatCurrency(metrics.milkPrice),
//       iconBgColor: "bg-blue-500",
//     },
//   ];

//   return (
//     <div className="">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Visão Geral</h2>

//       <div className="bg-white p-6 rounded-xl shadow-lg">
//         <div className="flex justify-between items-start gap-8">
//           {cardData.map((data, index) => (
//             <OverviewCard
//               key={index}
//               icon={data.icon}
//               title={data.title}
//               value={data.value}
//               iconBgColor={data.iconBgColor}
//             />
//           ))}
//         </div>

//         <hr className="my-6 border-gray-200" />

//         <p className="text-sm text-gray-500">
//           Última Atualização: {metrics.lastUpdated}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OverviewSection;
