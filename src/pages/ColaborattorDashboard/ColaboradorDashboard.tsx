import Button from "@/components/Button";
import { DataTable } from "@/components/DataTable";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTableContent } from "@/components/DataTable/DataTableContent";
import { DataTableFacetedFilter } from "@/components/DataTable/DataTableFacetedFilter";
import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "@/components/DataTable/DataTableTextFilter";
import iconAdd from "../../assets/iconAdd.svg";
import { columns } from "./columns";
import { invoices } from "./data";

import { useState } from "react";

export default function CollaboratorDashboard() {
  const [data] = useState(invoices);

  return (
    <div className="p-6 w-full">
      <Button styles="mb-8">
        <img src={iconAdd} alt="" />
        Novo Registro
      </Button>

      {/* <OverlayBackdrop isOpen={isOverlayOpen} onClose={handleCloseModal}>
        <UsersForm
          selectedUser={userToEdit}
          onClose={handleCloseModal}
          onUserSaved={handleSaveSuccess}
        />
      </OverlayBackdrop> */}

      <div className="flex flex-col p-8 bg-white justify-center items-center-5 gap-5 rounded-2xl">
        <div className="flex flex-col items-center p-5 gap-5 ">
          <h1 className="font-bold text-2xl">Tabela de Registro Diário</h1>
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
            <div>
              <DataTableTextFilter placeholder="Pesquisar" />
            </div>
            <div className="flex gap-8 items-center">
              <DataTableFacetedFilter column="paymentStatus" />
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
