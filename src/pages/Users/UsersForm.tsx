import { useEffect, useState } from "react";
import OverlayCard from "../../components/Overlay/OverlayCard";
import InputField from "../../components/InputField";
import { UserRole, type User } from "../../api/users-costApi";
import { useUserSubmit } from "../../hooks/users/useUserSubmit";
import { useUserUpdate } from "../../hooks/users/useUserUpdate";
import { ZodError } from "zod";
import { createUserSchema, updateUserSchema } from "@/lib/validation/userSchema";

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

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors({});
  }, [selectedUser]);

  const validate = () => {
    try {
      setErrors({});

      if (selectedUser) {
        updateUserSchema.parse({
          name,
          username,
          role,
        });
      } else {
        createUserSchema.parse({
          name,
          username,
          password,
          confirmPassword,
          role,
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
      await editUser(selectedUser.id, {
        name,
        username,
        role,
      });

      if (updateError) {
        setErrors({ form: updateError });
        return;
      }
    } else {
      await submitUser({
        name,
        username,
        password,
        confirmPassword,
        role,
      });

      if (createError) {
        setErrors({ form: createError });
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
          error={errors?.name}
          required
        />
        <InputField
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors?.username}
          required
        />

        {!selectedUser && (
          <>
            <InputField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors?.password}
              required
            />
            <InputField
              label="Confirmar Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors?.confirmPassword}
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

        {errors.form && (
          <p className="text-red-500 text-sm mt-2">{errors.form}</p>
        )}
      </div>
    </OverlayCard>
  );
}
