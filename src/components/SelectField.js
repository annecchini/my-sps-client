import React from 'react'

const SelectField = props => {
  const { label, name, value, onChange, disabled, options, info, error } = props

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange} disabled={disabled}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {info && <small>{info}</small>}
      {error && <small>{error}</small>}
    </div>
  )
}

export default SelectField
