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
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setUsername(selectedUser.username);
      setPassword("");
      setConfirmPassword("");
    } else {
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
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

    if (selectedUser) {
      const updated = await editUser(selectedUser.id, {
        name,
        username,
        role: selectedUser.role,
      });

      if (!updated) {
        window.toast(
          "Erro",
          updateError || "Erro ao atualizar usuário.",
          "error",
        );
        return;
      }

      window.toast("Sucesso", "Usuário atualizado com sucesso!", "success");
    } else {
      const created = await submitUser({
        name,
        username,
        password,
        confirmPassword,
        role: UserRole.COLLABORATOR,
      });

      if (!created) {
        window.toast("Erro", createError || "Erro ao criar usuário.", "error");
        return;
      }

      window.toast("Sucesso", "Usuário criado com sucesso!", "success");
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

        {(formError || createError || updateError) && (
          <p className="text-red-500 text-sm mt-2">
            {formError || createError || updateError}
          </p>
        )}
      </div>
    </OverlayCard>
  );
}
