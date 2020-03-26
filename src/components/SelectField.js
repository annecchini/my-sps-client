import React from 'react'
import { Form } from 'react-bootstrap'

const SelectField = props => {
  const { label, name, value, onChange, disabled, options, info, error } = props

  return (
    <React.Fragment>
      <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="select"
          name={name}
          value={value}
          onChange={onChange}
          isInvalid={error ? true : false}
          disabled={disabled}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
        {info && <small>{info}</small>}
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  )
}

export default SelectField
