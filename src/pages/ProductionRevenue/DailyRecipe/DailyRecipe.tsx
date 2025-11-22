import Button from "@/components/Button";
import OverviewSection from "@/components/Overview/OverviewSection";
import { dailyRecipe } from "./data";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTable } from "@/components/DataTable";
import { useState } from "react";
import { columns } from "./columns";

export default function DailyRecipe() {
  const [data] = useState(dailyRecipe);

  return (
    <div className="p-6 w-full">
      <Button>Definir preço do Leite</Button>
      <div className="pt-8 pb-8">
        <OverviewSection></OverviewSection>
      </div>
      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Receitas Diárias</h1>
        </div>

        <DataTable
          data={data}
          columns={columns}
          pagination={{
            pageIndex: 0,
            pageSize: 6,
          }}
        >
          <div className="mb-4 flex justify-between items-center gap-4">
            <DataTableTextFilter placeholder="Pesquisar" />

            <div className="flex gap-6 items-center">
              <DataTableColumnsVisibilityDropdown />
            </div>
          </div>

          <DataTableContent />

          <div className="flex justify-end items-center mt-4">
            <DataTablePagination />
          </div>
        </DataTable>
      </div>
    </div>
  );
}
