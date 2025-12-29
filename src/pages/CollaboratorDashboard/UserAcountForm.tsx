/* eslint-disable react-hooks/rules-of-hooks */
import type { UpdateUserDto } from "@/api/user/users-costApi";
import InputField from "@/components/InputField";
import OverlayCard from "@/components/Overlay/OverlayCard";
import { useAuth } from "@/context/AuthContext";
import { useUserUpdate } from "@/hooks/users/useUserUpdate";
import { useState } from "react";
import z, { ZodError } from "zod";

export function UserAccountForm({ onClose }: { onClose: () => void }) {
  const { user } = useAuth(); // ou contexto equivalente
  const { editUser, loading, error } = useUserUpdate();

  if (!user) {
    return null;
  }

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateUserSchema = z
    .object({
      name: z.string().min(3).optional(),
      username: z.string().min(3).optional(),
      password: z.string().min(5).optional(),
      confirmPassword: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.password) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "As senhas não conferem",
        path: ["confirmPassword"],
      },
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      updateUserSchema.parse({
        name,
        username,
        password: password || undefined,
        confirmPassword: confirmPassword || undefined,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((e) => {
          fieldErrors[e.path[0] as string] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    const dto: UpdateUserDto = {
      name,
      username,
    };

    if (password) {
      dto.password = password;
      dto.confirmPassword = confirmPassword;
    }

    const updated = await editUser(user.id, dto);

    if (!updated) {
      window.toast("Erro", error ?? "Erro ao atualizar usuário", "error");
      return;
    }

    window.toast("Sucesso", "Dados atualizados com sucesso", "success");
    onClose();
  };

  return (
    <OverlayCard
      title="Minha Conta"
      isSubmitting={loading}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <InputField
        label="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
      />

      <InputField
        label="Nova Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <InputField
        label="Confirmar Nova Senha"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />
    </OverlayCard>
  );
}
