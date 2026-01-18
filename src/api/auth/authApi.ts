import axios from "axios";

const API_URL = "/api";

export interface AuthResponse {
  access_token: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  role: string;
}

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export async function loginRequest(
  username: string,
  password: string,
): Promise<AuthResponse> {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
}

export async function getMeRequest(): Promise<UserProfile> {
  const response = await api.get("/me");
  return response.data;
}
