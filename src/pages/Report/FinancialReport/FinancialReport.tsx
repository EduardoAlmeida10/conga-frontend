import CardAnalysis from "@/components/CardAnalysis";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";

import { DataTable } from "@/components/DataTable";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";

import { relatorios } from "./data";
import { relatorioColumns } from "./columns";

import { ChartAreaInteractive } from "@/components/ChartAreaInteractive"; // <-- IMPORTANTE
import { ChartBarMultiple } from "@/components/ChartBarMultiple";

export default function FinancialReport() {
  return (
    <div className="flex flex-col gap-10 mt-7">
      <div>
        <p className="text-center text-gray-400">
          Período Selecionado <br /> Jun 25 - Jul 25
        </p>
      </div>

      <header className="flex justify-between items-center">
        <label>
          <p>Data</p>
          <input
            type="date"
            className="bg-white h-12 px-3 rounded cursor-pointer"
          />
        </label>
        <label>
          <p>Data</p>
          <input
            type="date"
            className="bg-white h-12 px-3 rounded cursor-pointer"
          />
        </label>
      </header>

      <div>
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Visão geral
        </h1>

        <div className="flex justify-between">
          <CardAnalysis title="Receita total" value={10}>
            <ArrowDown />
          </CardAnalysis>

          <CardAnalysis title="Despesas Totais" value={15}>
            <ArrowUp />
          </CardAnalysis>

          <CardAnalysis title="Resultado Mensal" value={32}>
            <DollarSign />
          </CardAnalysis>
        </div>
      </div>
      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Detalhes Financeiros</h1>
        </div>

        <DataTable data={relatorios} columns={relatorioColumns as any}>
          <div className="mb-4 flex justify-between items-center gap-4">
            <DataTableTextFilter placeholder="Pesquisar" />
            <div className="flex gap-6 items-center">
              <DataTableColumnsVisibilityDropdown />
            </div>
          </div>
          <DataTableContent />
        </DataTable>
      </div>
      <ChartAreaInteractive />
      <div className="flex flex-col w-max gap-5">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Comparação de Meses
        </h1>
        <div className="flex justify-between">
          <select
            className="w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
            outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          >
            <option>Janeiro</option>
            <option>Fevereiro</option>
            <option>Março</option>
            <option>Abril</option>
            <option>Maio</option>
            <option>Junho</option>
            <option>Julho</option>
            <option>Agosto</option>
            <option>Setembro</option>
            <option>Outubro</option>
            <option>Novembro</option>
            <option>Dezembro</option>
          </select>

          <select
            className="w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
            outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          >
            <option>Janeiro</option>
            <option>Fevereiro</option>
            <option>Março</option>
            <option>Abril</option>
            <option>Maio</option>
            <option>Junho</option>
            <option>Julho</option>
            <option>Agosto</option>
            <option>Setembro</option>
            <option>Outubro</option>
            <option>Novembro</option>
            <option>Dezembro</option>
          </select>
        </div>
        <ChartBarMultiple />
      </div>
    </div>
  );
}
