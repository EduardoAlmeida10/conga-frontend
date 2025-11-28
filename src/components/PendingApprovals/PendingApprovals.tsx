// src/components/PendingApprovals/PendingApprovals.tsx

import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai'; // Ícone da seta
import { MOCK_PENDING_ITEMS } from './mock';
import PendingItem from './PendingApprovalsItem';

const PendingApprovals: React.FC = () => {
  const pendingItems = MOCK_PENDING_ITEMS;
  
  const handleViewAll = () => {
    console.log("Navegando para a página de aprovações pendentes...");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Aprovação Pendentes</h2>

      <div className="divide-y divide-gray-100">
        {pendingItems.map(item => (
          <PendingItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button 
          onClick={handleViewAll} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150 text-base font-semibold mx-auto"
        >
          Ver Todos
          <AiOutlineArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PendingApprovals;