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
      login: async (email, password) => {
        set({ loading: true, error: null });
      
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              body: { email, password }
            }),
          });
          
          const data = await response.json();
          
          if (data.result.message == 'Invalid Credentials!') {
            set({ loading: false, error: 'Invalid email or password' });
            return false;
          }
          
      
          if (response.ok) {
            
            const { accessToken, expiresIn } = data.result.data;
            set({
              token: accessToken,
              expiresIn: expiresIn,
              loading: false,
              error: null
            });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error('Login request failed:', error);
          set({ 
            loading: false, 
            error: 'Network error: Could not connect to server' 
          });
          return false;
        }
      },
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