// src/pages/Users/Users.tsx
import { useCallback, useMemo } from "react";
import Button from "../../components/Button";
import iconAdd from "../../assets/iconAdd.svg";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import UsersForm from "./UsersForm";

import { DataTable } from "../../components/DataTable";
import { DataTableContent } from "../../components/DataTable/DataTableContent";
import { DataTablePagination } from "../../components/DataTable/DataTablePagination";
import { DataTableTextFilter } from "../../components/DataTable/DataTableTextFilter";
import { DataTableColumnsVisibilityDropdown } from "@/components/DataTable/DataTableColumnsVisibilityDropdown";

import { useUserData } from "../../hooks/users/useUserData";
import { useUserDelete } from "../../hooks/users/useUserDelete";
import { useUserModal } from "../../hooks/users/useUserModal";
import { getUserColumns } from "./columns";
import type { User } from "../../api/users-costApi";

export default function Users() {
  const {
    isOverlayOpen,
    userToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  } = useUserModal();

  const { data, loading, error, page, limit, setPage, refetch } = useUserData();
  const { removeUser, loading: deleting } = useUserDelete();

  const users = data?.data || [];

  const handleDelete = useCallback(
    async (user: User) => {
      if (!confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`))
        return;
      await removeUser(user.id);
      refetch();
      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      }
    },
    [removeUser, refetch, users.length, page, setPage],
  );

  const columns = useMemo(
    () => getUserColumns(handleOpenEditModal, handleDelete),
    [handleOpenEditModal, handleDelete],
  );

  const paginationProps = {
    pageIndex: Math.max(0, (page || 1) - 1),
    pageSize: limit || 10,
    pageCount: data?.totalPages || 1,
    manualPagination: true,
    onPaginationChange: (updater: any) => {
      const newPage =
        typeof updater === "function"
          ? updater({ pageIndex: (page || 1) - 1, pageSize: limit || 10 })
              .pageIndex + 1
          : updater.pageIndex + 1;

      setPage(newPage);
    },
  };

  const handleSaveSuccess = () => {
    refetch();
    handleCloseModal();
  };

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <Button styles="mb-8" onClick={handleOpenCreateModal}>
        <img src={iconAdd} alt="" />
        Novo Trabalhador
      </Button>

      <OverlayBackdrop isOpen={isOverlayOpen} onClose={handleCloseModal}>
        <UsersForm
          selectedUser={userToEdit}
          onClose={handleCloseModal}
          onUserSaved={handleSaveSuccess}
        />
      </OverlayBackdrop>

      {loading && <p className="text-gray-600">Carregando usuários...</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
      {deleting && <p className="text-gray-600">Excluindo usuário...</p>}

      {!loading && !error && (
        <div className="flex flex-col p-12 bg-white justify-center items-center-5 gap-5 rounded-2xl">
          <DataTable<User>
            data={users}
            columns={columns}
            pagination={paginationProps}
          >
            <div className="mb-4 flex justify-between items-center gap-4">
              <DataTableTextFilter placeholder="Buscar trabalhadores" />
              <DataTableColumnsVisibilityDropdown />
            </div>

            <DataTableContent />

            <div className="flex justify-between items-center mt-4">
              <h1 className="text-[20px] font-bold">
                Número de Colaboradores: {data?.total}
              </h1>
              <DataTablePagination />
            </div>
          </DataTable>
        </div>
      )}
    </div>
  );
}
