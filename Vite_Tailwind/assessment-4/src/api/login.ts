import { apiClient } from "./config";

type LoginArgs = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

export async function loginUser({ email, password }: LoginArgs): Promise<LoginResponse> {
  const res = await apiClient.post("/api/login", { email, password });

  
  return res.data.result.data;
}
