
import React from 'react';
import Button from '../../atoms/Botton';
import useThemeStore from '../../../store/themeStore';
import { ConfirmationModalProps } from './ConfirmationModalProps.type';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
}) => {
  const { theme } = useThemeStore();

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`p-6 rounded-lg shadow-xl w-full max-w-md ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {message}
        </p>
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onCancel}
            className={`px-4 py-2 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className={`px-4 py-2 text-white ${
              theme === 'dark' 
                ? 'bg-red-700 hover:bg-red-800' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;