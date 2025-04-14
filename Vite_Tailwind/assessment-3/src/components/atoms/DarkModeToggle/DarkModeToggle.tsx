import { Moon, Sun } from 'lucide-react';
import { DarkModeToggleProps } from './DarkModeToggle.type';


const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode }) => (
  <button onClick={toggleDarkMode} className="p-2 rounded">
    {darkMode ? <Moon className="text-white" /> : <Sun className="text-black" />}
  </button>
);

export default DarkModeToggle;
