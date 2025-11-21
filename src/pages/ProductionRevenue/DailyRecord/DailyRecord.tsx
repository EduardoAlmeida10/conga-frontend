import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";

import { useState } from "react";

import { columns } from "./columns";
import { dailyRecords } from "./data";

export default function DailyRecord() {
  const [data] = useState(dailyRecords);

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Registros Pequenos Produtores</h1>
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
