import React from 'react'

const TextField = props => {
  const { label, type, name, value, onChange, info, error } = props

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} value={value} onChange={onChange} />
      {info && <small>{info}</small>}
      {error && <small>{error}</small>}
    </div>
  )
}

export default TextField
