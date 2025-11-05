import { useState } from "react";
import Button from "../../components/Button";
import OverlayBackdrop from "../../components/Overlay/OverlayBackdrop";
import { CardExpenses } from "../../components/CardExpenses";
import CardExpensesTable from "../../components/CardExpenses/CardExpensesTable";
import iconAdd from "../../assets/iconAdd.svg";
import { useUserData } from "../../hooks/users/useUserData";
import { useUserDelete } from "../../hooks/users/useUserDelete";
import type { User } from "../../api/users-costApi";
import UsersForm from "./UsersForm";

export default function Users() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { removeUser, loading: deleting } = useUserDelete();
  const { data, loading, error, page, limit, setPage, refetch } = useUserData();

  const users = data?.data || [];

  const columns = [
    { key: "name", header: "Nome" },
    { key: "username", header: "Usuário" },
    { key: "role", header: "Função" },
  ];

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsOverlayOpen(true);
  };

  const handleDelete = async (user: any) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`))
      return;
    await removeUser(user.id);
    refetch();
  };

  return (
    <div className="w-[950px]">
      {deleting && <p className="text-gray-600">Excluindo usuário...</p>}
      <Button
        styles="mb-3"
        onClick={() => {
          setSelectedUser(null);
          setIsOverlayOpen(true);
        }}
      >
        <img src={iconAdd} alt="" />
        Novo Trabalhador
      </Button>
      <OverlayBackdrop
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      >
        <UsersForm
          selectedUser={selectedUser}
          onClose={() => setIsOverlayOpen(false)}
          onUserSaved={refetch}
        />
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
            text={`Total de Trabalhadores: ${data?.total ?? 0}`}
            totalItems={data?.total ?? 0}
            itemsPerPage={limit}
            currentPage={page}
            onPageChange={setPage}
          />
        </CardExpenses.Root>
      )}
    </div>
  );
}
