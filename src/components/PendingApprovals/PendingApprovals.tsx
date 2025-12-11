import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import PendingItem from "./PendingApprovalsItem";
import { useFetchProducerProductionRequests } from "@/hooks/productions/producer_productions_request/useFetchProducerProductionRequest";
import { useNavigate } from "react-router-dom";

const PendingApprovals: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: requests,
    loading,
    error,
    totalItems,
  } = useFetchProducerProductionRequests(0, 5, "PENDING");

  const handleViewAll = () => {
    const path = "/producao";

    const statePayload = {
      targetTab: "Registro Produtores",
      targetFilter: "PENDING",
    };

    navigate(path, { state: statePayload });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Aprovação Pendentes
      </h2>

      {loading && (
        <p className="text-center text-gray-600">Carregando pendências...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="divide-y divide-gray-100">
            {requests.length === 0 ? (
              <p className="py-4 text-center text-gray-500">
                Nenhuma aprovação pendente.
              </p>
            ) : (
              requests
                .slice(0, 3)
                .map((item) => <PendingItem key={item.id} item={item} />)
            )}
          </div>

          {totalItems > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={handleViewAll}
                className="flex items-center text-blue-600 hover:text-blue-800 transition duration-150 text-base font-semibold mx-auto cursor-pointer"
              >
                Ver Todos ({totalItems})
                <AiOutlineArrowRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PendingApprovals;
