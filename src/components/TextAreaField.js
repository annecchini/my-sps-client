import React from 'react'
import { Form } from 'react-bootstrap'

const TextAreaField = props => {
  const { label, name, value, onChange, info, error } = props

  return (
    <React.Fragment>
      <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="textarea"
          name={name}
          value={value}
          onChange={onChange}
          rows="5"
          isInvalid={error ? true : false}
        />
        {info && <small>{info}</small>}
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  )
}

export default TextAreaField
