
export interface LoginState {
  token: string | null;
  expiresIn: number | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void; 
}