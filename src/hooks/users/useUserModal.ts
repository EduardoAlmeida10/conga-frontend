import { useState, useCallback } from "react";
import type { User } from "../../api/user/users-costApi";

export function useUserModal() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleOpenCreateModal = useCallback(() => {
    setUserToEdit(null);
    setIsOverlayOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((user: User) => {
    setUserToEdit(user);
    setIsOverlayOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOverlayOpen(false);
  }, []);

  return {
    isOverlayOpen,
    userToEdit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
  };
}
