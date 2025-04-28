export interface LoginState {
  token: string | null;
  expiresIn: number | null;
  loading: boolean;
  error: string | null;
  startLogin: () => void;
  setAuthData: (token: string, expiresIn: number) => void;
  loginError: (error: string) => void;
  logout: () => void;
  clearError: () => void;
}