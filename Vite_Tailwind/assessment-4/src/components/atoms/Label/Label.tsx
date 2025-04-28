import React from 'react'
import {LabelProps}  from './Label.type'

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
    )
  }
  
  export default Label