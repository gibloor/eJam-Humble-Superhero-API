import React, { ChangeEvent } from 'react'

type InputProps = {
  label?: string
  type?: 'text' | 'number'
  value: number | string
  required?: boolean
  onChange: (value: string) => void
  regulator?: (value: string) => string
}

const Input = ({ label, type, value, required, onChange, regulator }: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = regulator ? regulator(e.target.value) : e.target.value
    onChange(value)
  }

  return (
    <div>
      {label ?
        <label>
          {label}
        </label> : null
      }
      <input
        type={type || 'text'}
        onChange={handleChange}
        value={value}
        required={required}
      />
    </div>
  )
}

export default Input