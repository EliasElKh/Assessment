import React from 'react'
import useThemeStore from '../../../store/themeStore'
import { InputGroupProps } from './InputGroup.type'


const InputGroup: React.FC<InputGroupProps> = ({ 
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  theme,
  error
}) => {
  const currentTheme = useThemeStore(state => state.theme)
  const activeTheme = theme || currentTheme

  return (
    <div className="mb-4">
      <label 
        htmlFor={id}
        className={`block mb-2 text-sm font-medium ${
          activeTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        
      
        className={`w-full p-2.5 text-sm rounded-lg border ${
          activeTheme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
        } ${
          error ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default InputGroup