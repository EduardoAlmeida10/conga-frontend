// src/pages/Users/Users.tsx
import { useCallback, useMemo, useState } from "react";
import iconAdd from "../../assets/iconAdd.svg";
import Button from "../../components/Button";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import UsersForm from "./UsersForm";

import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";
import { DataTable } from "../../components/DataTable";
import { DataTableContent } from "../../components/DataTable/DataTableContent";
import { DataTablePagination } from "../../components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "../../components/DataTable/DataTableTextFilter";

import type { User } from "../../api/user/users-costApi";
import { useUserData } from "../../hooks/users/useUserData";
import { useUserDelete } from "../../hooks/users/useUserDelete";
import { useUserModal } from "../../hooks/users/useUserModal";
import { getUserColumns } from "./columns";

export default function Users() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });

  const {
    isOverlayOpen,
    userToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  } = useUserModal();

  const {
    users,
    totalItems,
    loading,
    error: errorData,
    refetch,
  } = useUserData(pagination.pageIndex, pagination.pageSize);

  const { removeUser, error: errorDelete, loading: deleting } = useUserDelete();

  const pageCount = Math.ceil(totalItems / pagination.pageSize);

  const handleDelete = useCallback(
    async (user: User) => {
      if (!confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`))
        return;
      await removeUser(user.id);

      if (!errorDelete) {
        window.toast("Sucesso", "Usuário removido com sucesso!", "success");
      } else {
        window.toast("Erro", "Falha ao excluir o usuário.", "error");
      }

      refetch();

      if (users.length === 1 && pagination.pageIndex > 0) {
        setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
      }
    },
    [removeUser, refetch, errorDelete, users.length, pagination.pageIndex],
  );

  const columns = useMemo(
    () => getUserColumns(handleOpenEditModal, handleDelete),
    [handleOpenEditModal, handleDelete],
  );

  const handleSaveSuccess = () => {
    refetch();
    handleCloseModal();
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Button styles="mb-8" onClick={handleOpenCreateModal}>
        <img src={iconAdd} alt="" />
        Novo Usuário
      </Button>

      <OverlayBackdrop isOpen={isOverlayOpen} onClose={handleCloseModal}>
        <UsersForm
          selectedUser={userToEdit}
          onClose={handleCloseModal}
          onUserSaved={handleSaveSuccess}
        />
      </OverlayBackdrop>

      {loading && <p className="text-gray-600">Carregando usuários...</p>}
      {errorData && <p className="text-red-500">Erro: {errorData}</p>}
      {deleting && <p className="text-gray-600">Excluindo usuário...</p>}

      {!loading && !errorData && (
        <div className="flex flex-col p-12 bg-white justify-center items-center gap-5 rounded-2xl">
          <DataTable<User>
            data={users}
            columns={columns as any}
            pagination={pagination}
            onPaginationChange={setPagination}
            pageCount={pageCount}
          >
            <div className="mb-4 flex justify-between items-center w-full">
              <DataTableTextFilter placeholder="Buscar trabalhadores" />
              <DataTableColumnsVisibilityDropdown />
            </div>

            <DataTableContent />

            <div className="flex justify-between items-center gap-15 mt-4">
              <h1 className="text-[20px] font-bold">
                Número de Colaboradores: {totalItems}
              </h1>
              <DataTablePagination />
            </div>
          </DataTable>
        </div>
      )}
    </div>
  );
}
