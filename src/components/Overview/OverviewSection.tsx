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
