import React from 'react'

const CheckboxField = props => {
  const { label, name, checked, onChange, info, error } = props

  return (
    <div>
      <input type="checkbox" id={name} name={name} checked={checked} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
      {info && <small>{info}</small>}
      {error && <small>{error}</small>}
    </div>
  )
}

export default CheckboxField
