import React from 'react'
import { Form } from 'react-bootstrap'

const CheckboxField = props => {
  const { type, label, name, checked, onChange, info, error } = props

  return (
    <React.Fragment>
      <Form.Group controlId={name}>
        <Form.Check type={type} id={name}>
          <Form.Check.Input type={type} name={name} checked={checked} onChange={onChange} />
          <Form.Check.Label>{label}</Form.Check.Label>
          {info && <small>{info}</small>}
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
    </React.Fragment>
  )
}

export default CheckboxField
