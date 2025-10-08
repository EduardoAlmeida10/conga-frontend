export interface UserPayload {
  sub: number;
  username: string;
  role: "admin" | "colaborador";
}

export interface AuthResponse {
  access_token: string;
  user: UserPayload;
}

export interface AuthContextType {
  user: UserPayload | null;
  login: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void> | void;
}
