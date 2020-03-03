import React from 'react'

const CheckboxField = props => {
  const { label, name, value, checked, onChange, info, error } = props

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="checkbox" id={name} name={name} value={value} checked={checked} onChange={onChange} />
      {info && <small>{info}</small>}
      {error && <small>{error}</small>}
    </div>
  )
}

export default CheckboxField
