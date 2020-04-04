import React from 'react'
import { Card, Form, Button, Alert, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import SelectField from '../../components/SelectField'

const Create = props => {
  const { process, errors, createData, assignmentOptions } = props

  return (
    <React.Fragment>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to={`/process/read/${process ? process.id : ''}`}>
          <Breadcrumb.Item>{`Processo ${process ? process.identifier : ''}/${
            process ? process.year : ''
          }`}</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to={`/teste/by-proc/${process ? process.id : ''}`}>
          <Breadcrumb.Item>{`Atribuições de cargo`}</Breadcrumb.Item>
        </LinkContainer>

        <Breadcrumb.Item active>{`Nova atribuição de cargo`}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Criar atribuição de cargo</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={() => {}}>
            {errors.id ? (
              <Alert className="my-2" variant="danger">
                {errors.id} || {errors.process_id}
              </Alert>
            ) : null}

            <SelectField
              label="Cargo"
              name="assignment_id"
              value={createData.assignment_id}
              onChange={() => {}}
              options={assignmentOptions}
              error={errors.assignment_id}
            />

            <Button variant="primary" type="submit">
              Enviar
            </Button>

            <Button className="ml-1" variant="secondary" onClick={() => {}}>
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default Create
