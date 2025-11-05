import { useEffect, useState } from "react";
import OverlayCard from "../../components/Overlay/OverlayCard";
import InputField from "../../components/InputField";
import { UserRole, type User } from "../../api/users-costApi";
import { useUserSubmit } from "../../hooks/users/useUserSubmit";
import { useUserUpdate } from "../../hooks/users/useUserUpdate";

interface UsersFormProps {
  selectedUser?: User | null;
  onClose: () => void;
  onUserSaved: () => void;
}

export default function UsersForm({
  selectedUser,
  onClose,
  onUserSaved,
}: UsersFormProps) {
  const { submitUser, loading: creating, error: createError } = useUserSubmit();
  const { editUser, loading: updating, error: updateError } = useUserUpdate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.COLLABORATOR);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setUsername(selectedUser.username);
      setRole(selectedUser.role);
      setPassword("");
      setConfirmPassword("");
    } else {
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRole(UserRole.COLLABORATOR);
    }
    setFormError(null);
  }, [selectedUser]);

  const validateForm = () => {
    if (!name.trim() || !username.trim()) {
      setFormError("Preencha todos os campos obrigatórios.");
      return false;
    }
    if (!selectedUser && (!password || !confirmPassword)) {
      setFormError("A senha e a confirmação são obrigatórias.");
      return false;
    }
    if (!selectedUser && password !== confirmPassword) {
      setFormError("As senhas não coincidem.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validateForm()) return;

    if (!validateForm()) return;

    if (selectedUser) {
      const updated = await editUser(selectedUser.id, { name, username, role });
      if (!updated) {
        setFormError(updateError || "Erro ao atualizar usuário.");
        return;
      }
    } else {
      await submitUser({ name, username, password, confirmPassword, role });
      
    if (createError) {
      setFormError(createError);
      return;
    }
    }
    onUserSaved();
    onClose();
  };

  const isSubmitting = creating || updating;

  return (
    <OverlayCard
      title={selectedUser ? "Editar Usuário" : "Novo Usuário"}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <InputField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {!selectedUser && (
          <>
            <InputField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputField
              label="Confirmar Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        <select
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value={UserRole.COLLABORATOR}>Colaborador</option>
          <option value={UserRole.ADMIN}>Administrador</option>
        </select>

        {(formError || createError || updateError) && (
          <p className="text-red-500 text-sm mt-2">
            {formError || createError || updateError}
          </p>
        )}
      </div>
    </OverlayCard>
  );
}
