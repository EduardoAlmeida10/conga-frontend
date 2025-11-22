import Button from "@/components/Button";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTable } from "@/components/DataTable";
import { useState } from "react";
import { columns } from "./columns";
import { localRecord } from "./data";

export default function LocalRecord() {
  const [data] = useState(localRecord);

  return (
    <div className="p-6 w-full">
      <div className="pt-6 pb-6">
        <Button>Novo Registro</Button>
      </div>
      <div className="flex flex-col p-8 bg-white justify-center gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5">
          <h1 className="font-bold text-2xl">Registro Local</h1>
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
