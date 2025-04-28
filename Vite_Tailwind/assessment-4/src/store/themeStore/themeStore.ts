import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from './themeStore.type';
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light', 
      setTheme: (theme) => set({ theme }), 
    }),
    {
      name: 'theme-storage', 
    }
  )
);

export default useThemeStore;
