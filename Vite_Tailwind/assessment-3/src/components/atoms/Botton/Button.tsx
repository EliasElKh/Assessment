import React from 'react'
import { ButtonProps } from './Button.type'

const Button: React.FC<ButtonProps> = ({ text, onClick, className = '', children }) => {
  return (
    <button
      onClick={onClick}
      className={` ${className}`}
    >
      {children ? children : text}
    </button>
  )
}

export default Button
