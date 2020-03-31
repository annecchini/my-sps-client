import React from 'react'
import { Card, Form, Alert, Button, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import TextField from '../TextField'
import TextAreaField from '../TextAreaField'
import SelectField from '../SelectField'
import CheckboxField from '../CheckboxField'
import ErrorAlert from '../Error/ErrorAlert'

const ProcessCreate = props => {
  const { onSubmit, createData, onChange, onCheck, errors, courseOptions, errorStore } = props

  return (
    <React.Fragment>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to={`/process/create/`}>
          <Breadcrumb.Item active>Novo processo</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>

      <ErrorAlert errorStore={errorStore} />

      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Criar processo</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={onSubmit}>
            {errors.id ? (
              <Alert className="my-2" variant="danger">
                {errors.id}
              </Alert>
            ) : null}

            <TextField
              label="Identificador"
              type="text"
              name="identifier"
              value={createData.identifier}
              onChange={onChange}
              error={errors.identifier}
            />

            <TextField
              label="Ano"
              type="text"
              name="year"
              value={createData.year}
              onChange={onChange}
              error={errors.year}
            />

            <SelectField
              label="Curso"
              name="course_id"
              value={createData.course_id}
              onChange={onChange}
              options={courseOptions}
              error={errors.course_id}
            />

            <TextAreaField
              label="Descrição"
              name="description"
              value={createData.description}
              onChange={onChange}
              error={errors.description}
            />

            <CheckboxField
              type="checkbox"
              label="Visível"
              name="visible"
              checked={createData.visible}
              error={errors.visible}
              onChange={onCheck}
            />

            <Button variant="primary" type="submit">
              Enviar
            </Button>

            <Button className="ml-1" variant="secondary" onClick={props.history.goBack}>
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default ProcessCreate
