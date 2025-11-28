// src/components/PendingApprovals/PendingItem.tsx

import React from 'react';
import type { ApprovalItem } from './mock';

interface PendingItemProps {
  item: ApprovalItem;
}

const PendingItem: React.FC<PendingItemProps> = ({ item }) => {
  // Função para formatar o valor como Litros (L)
  const formatLiters = (value: number) => 
    `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}L`;
    
  // Estilo condicional para o status "Pendente"
  const statusClasses = "bg-amber-100 text-amber-700 font-semibold text-xs py-1 px-3 rounded-full";

  return (
    <div className="border-b border-gray-200 last:border-b-0 py-4">
      <div className="flex justify-between items-start">
        {/* Informações Principais */}
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-700 mt-1">
            Quantidade Total: {formatLiters(item.quantity)}
          </p>
          <p className="text-sm text-gray-500">
            Data: {item.date}
          </p>
        </div>
        
        {/* Tag de Status */}
        <span className={statusClasses}>
          {item.status}
        </span>
      </div>
    </div>
  );
};

export default PendingItem;