import React from 'react'
import { Form } from 'react-bootstrap'

const TextField = props => {
  const { label, type, name, value, onChange, info, error } = props

  return (
    <React.Fragment>
      <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} name={name} value={value} onChange={onChange} isInvalid={error ? true : false} />
        {info && <small>{info}</small>}
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </React.Fragment>
  )
}

export default TextField
