// src/pages/Users/Users.tsx
import { useState } from "react";
import Button from "../../components/Button";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import { CardExpenses } from "../../components/CardExpenses";
import CardExpensesTable from "../../components/CardExpenses/CardExpensesTable";
import iconAdd from "../../assets/iconAdd.svg";
import { useUserData } from "../../hooks/users/useUserData";
import OverlayCardUserForm from "../../components/Overlay/OverlayCardUserForm";
import { useUserDelete } from "../../hooks/users/useUserDelete";

export default function Users() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { removeUser, loading: deleting, success, error: errorDelete } = useUserDelete();
  const {
    data,
    loading,
    error,
    page,
    limit,
    setPage,
    refetch
  } = useUserData();

  const users = data?.data || [];

  const columns = [
    { key: "name", header: "Nome" },
    { key: "username", header: "Usuário" },
    { key: "role", header: "Função" },
  ];

  const handleEdit = (user: any) => console.log("Editar:", user);
  const handleDelete = async (user: any) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) return;
    await removeUser(user.id);
    refetch();
  };

  return (
    <div className="w-[950px]">
      {error && <p className="text-red-500">{error}</p>}
      {deleting && <p className="text-gray-600">Excluindo usuário...</p>}
      {success && <p className="text-green-600">Usuário excluído com sucesso!</p>}
      <Button styles="mb-3" onClick={() => setIsOverlayOpen(true)}>
        <img src={iconAdd} alt="" />
        Novo Trabalhador
      </Button>

      <OverlayBackdrop
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      >
        <OverlayCardUserForm />
      </OverlayBackdrop>
      {loading && <p className="text-gray-600">Carregando usuários...</p>}
      {error && <p className="text-red-500">Erro: {error}</p>}
      {!loading && !error && (
        <CardExpenses.Root title="Trabalhadores">
          <CardExpenses.Search />
          <CardExpensesTable
            data={users}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <CardExpenses.Footer
            text={`Total de Trabalhadores: ${users.length}`}
            totalItems={users.length}
            itemsPerPage={limit}
            currentPage={page}
            onPageChange={setPage}
          />
        </CardExpenses.Root>
      )}
    </div>
  );
}
