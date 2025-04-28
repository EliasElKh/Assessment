import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LoginState } from './login.type'

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      token: null,
      expiresIn: null,
      loading: false,
      error: null,
      
      setAuthData: (token: string, expiresIn: number) => {
        set({
          token,
          expiresIn,
          loading: false,
          error: null
        });
      },
      
      
      startLogin: () => set({ loading: true, error: null }),
      loginError: (error: string) => set({ loading: false, error }),
      logout: () => {
        set({
          token: null,
          expiresIn: null,
          error: null,
          loading: false
        });
      },
      clearError: () => set({ error: null })
    }),
    {
      name: 'login-storage',
    }
  )
)

export default useLoginStore