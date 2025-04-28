import React from 'react'
import { InputProps } from './Input.type'

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  className = '',

}) => {
  return (
    <input
  id={id}
  type={type}
  value={value}
  onChange={onChange}
  className={`w-full px-4 py-2 border rounded-md focus:outline focus:outline-[2px] focus:outline-[#3251D0] focus:outline-offset-2 ${className}`}
/>

  )
}

export default Input