import { api } from "../auth/authApi";

export const UserRole = {
  ADMIN: "ADMIN",
  COLLABORATOR: "COLLABORATOR",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
}

export interface RegisterUserDto {
  name: string;
  username: string;
  password?: string;
  confirmPassword?: string;
  role: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface PaginatedUsers {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: User[];
}

const BASE_URL = "/users";

export async function registerUser(dto: RegisterUserDto): Promise<User> {
  const response = await api.post(`${BASE_URL}/register`, dto);
  return response.data;
}

export async function findAllUsers(filters: {
  page?: number;
  limit?: number;
}): Promise<PaginatedUsers> {
  const response = await api.get(BASE_URL, { params: filters });
  return response.data;
}

export async function findUserById(id: string): Promise<User> {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
}

export async function updateUser(
  id: string,
  dto: UpdateUserDto,
): Promise<User> {
  const response = await api.put(`${BASE_URL}/${id}`, dto);
  return response.data;
}

export async function deleteUser(id: string): Promise<{ message: string }> {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
}
