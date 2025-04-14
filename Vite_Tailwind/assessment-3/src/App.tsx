


import React, { useEffect } from 'react';
import AppRoutes from './routes';
import useThemeStore from './store/themeStore';

const App: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="transition-all">
      <AppRoutes />
    </div>
  );
};

export default App;
