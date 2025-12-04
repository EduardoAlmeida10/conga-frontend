import React from "react";
import type { ProducerProductionRequest } from "@/api/productions/productionProducerRequest";

interface PendingItemProps {
  item: ProducerProductionRequest;
}

const PendingItem: React.FC<PendingItemProps> = ({ item }) => {
  const formatLiters = (value: number) =>
    `${value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}L`;

  const [year, month, day] = item.date.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  const formattedDate = localDate.toLocaleDateString("pt-BR");

  const statusClasses =
    "bg-amber-100 text-amber-700 font-semibold text-xs py-1 px-3 rounded-full";

  return (
    <div className="border-b border-gray-200 last:border-b-0 py-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-900">
            {item.producerName}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Quantidade Total: {formatLiters(item.totalQuantity)}
          </p>
          <p className="text-sm text-gray-500">Data: {formattedDate}</p>
        </div>

        <span className={statusClasses}>{item.status}</span>
      </div>
    </div>
  );
};

export default PendingItem;
