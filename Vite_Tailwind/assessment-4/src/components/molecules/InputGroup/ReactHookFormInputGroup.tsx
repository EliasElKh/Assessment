
import React from 'react';
import { InputGroupProps } from './InputGroup.type';
import useThemeStore from '../../../store/themeStore';

export const RHFInputGroup = React.forwardRef<HTMLInputElement, InputGroupProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ id, label, type, placeholder, theme, error, ...rest }, ref) => {
    const currentTheme = useThemeStore(state => state.theme);
    const activeTheme = theme || currentTheme;

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
          placeholder={placeholder}
          ref={ref}
          {...rest}
          className={`w-full p-2.5 text-sm rounded-lg border ${
            activeTheme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
