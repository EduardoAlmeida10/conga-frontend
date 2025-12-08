import { useEffect, useState } from "react";
import OverlayCard from "../../components/Overlay/OverlayCard";
import InputField from "../../components/InputField";
import { UserRole, type User } from "../../api/user/users-costApi";
import { useUserSubmit } from "../../hooks/users/useUserSubmit";
import { useUserUpdate } from "../../hooks/users/useUserUpdate";
import { ZodError } from "zod";
import {
  createUserSchema,
  updateUserSchema,
} from "@/lib/validation/userSchema";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors({});
  }, [selectedUser]);

  const validate = () => {
    try {
      setErrors({});

      if (selectedUser) {
        updateUserSchema.parse({
          name,
          username,
        });
      } else {
        createUserSchema.parse({
          name,
          username,
          password,
          confirmPassword,
        });
      }

      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((e) => {
          if (e.path.length > 0) {
            fieldErrors[String(e.path[0])] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (selectedUser) {
      const updated = await editUser(selectedUser.id, {
        name,
        username,
        role: selectedUser.role,
      });
      if (updateError && !updated) {
        setErrors({ form: updateError });
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

      if (createError && !created) {
        setErrors({ form: createError });
        window.toast("Erro", createError || "Erro ao criar usuário.", "error");
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
          label="Nome*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors?.name}
          required
        />
        <InputField
          label="Usuário*"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors?.username}
          required
        />

        {!selectedUser && (
          <>
            <InputField
              label="Senha*"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors?.password}
              required
            />
            <InputField
              label="Confirmar Senha*"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors?.confirmPassword}
              required
            />
          </>
        )}
      </div>
    </OverlayCard>
  );
}
