import React from "react";
import Button from "../../atoms/Botton";
import { Sun, Moon } from "lucide-react";
import useLoginStore from "../../../store/login";
import useThemeStore from "../../../store/themeStore";

const DashboardHeader: React.FC = () => {
  
  const clearSession = useLoginStore((state) => state.logout);

  const { theme, setTheme } = useThemeStore((state) => state);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    clearSession(); 
    
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#3251D0] text-white">
      <h1 className="text-xl font-semibold">User Management</h1>
      <div className="flex items-center gap-4">
        
        <Button
          className="bg-white text-[#3251D0] border-[#3251D0] hover:bg-[#e0f0ff] hover:text-[#3251D0] py-2 px-5 rounded-lg transition"
          onClick={() => console.log("Create User")}
        >
          Create User
        </Button>
        
        
        <Button
          className="bg-red-600 text-white hover:bg-red-700 py-2 px-5 rounded-lg transition"
          onClick={handleLogout}
        >
          Logout
        </Button>
        
        
        <Button className="transition hover:scale-110" onClick={toggleTheme} variant="outline">
          {theme === 'dark' ? (
            <Sun size={20} className="mr-2 transition hover:text-yellow-400" />
          ) : (
            <Moon size={20} className="mr-2 transition hover:text-yellow-400" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
