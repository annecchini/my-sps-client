import React from 'react'

const TextAreaField = props => {
  const { label, name, value, onChange, info, error } = props

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} value={value} onChange={onChange} />
      {info && <small>{info}</small>}
      {error && <small>{error}</small>}
    </div>
  )
}

export default TextAreaField
