import React from "react";
import Button from "../../atoms/Botton";
import { Card } from "../../atoms/Card";
import Label from "../../atoms/Label";
import useThemeStore from "../../../store/themeStore"; 
import { UserCardProps } from "./userCard.type";


const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const { theme } = useThemeStore();
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  
  return (
    <Card className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex flex-col items-center space-y-4">
        
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'
        }`}>
          <span className="text-white text-xl font-bold">{initials}</span>
        </div>

        
        <div className="text-center space-y-2">
          <h3 className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {user.firstName} {user.lastName}
          </h3>
          
          <Label className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Email: {user.email}
          </Label>
          
          {user.status && (
            <Label className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Status: {user.status}
            </Label>
          )}
          
          {user.dateOfBirth && (
            <Label className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Date of Birth: {user.dateOfBirth}
            </Label>
          )}

          
          <div className="flex justify-end space-x-4 pt-2">
            <Button
              onClick={() => onEdit(user.id)}
              className={`px-4 py-2 rounded text-white ${
                theme === 'dark' 
                  ? 'bg-blue-700 hover:bg-blue-800' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(user.id)}
              className={`px-4 py-2 rounded text-white ${
                theme === 'dark' 
                  ? 'bg-red-700 hover:bg-red-800' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;