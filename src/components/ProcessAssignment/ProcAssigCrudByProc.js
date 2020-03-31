import React from 'react'
import { Card, Form, Alert, Button, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import ErrorAlert from '../../components/Error/ErrorAlert'
import SelectField from '../../components/SelectField'
import PrivateGroup from '../../containers/Auth/PrivateGroup'

const ProcAssigCrudByProc = props => {
  const { errorStore, process, course, processAssignments, assignments } = props
  const {
    mode,
    setMode,
    goToCreateProcAssig,
    createData,
    assignmentOptions,
    onChange,
    onSubmit,
    goToDeleteProcAssig,
    deleteData,
    onDeletePA,
    onCancel,
    errors
  } = props

  const renderList = () => {
    return (
      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Atribuições de cargo do processo</Card.Header>
        <Card.Body>
          {/* Lista de botões */}
          <div className="mb-1">
            <PrivateGroup permission="processAssignment_create" course_id={course ? course.id : false}>
              <Button onClick={goToCreateProcAssig}>Nova atribuição de cargo</Button>
            </PrivateGroup>
          </div>
          {/* Lista de atrbuições de cargo */}
          <ul className="list-group mb-1">
            {processAssignments && processAssignments.length > 0 ? (
              processAssignments.map(pa => (
                <li className="list-group-item" key={pa.id}>
                  <div className="row">
                    <div className="col d-flex align-items-center">{`${
                      assignments.find(assig => assig.id === pa.assignment_id).name
                    }`}</div>
                    <div className="col d-flex  d-flex align-items-center justify-content-end">
                      <PrivateGroup permission="processAssignment_delete" course_id={course ? course.id : false}>
                        <Button variant="danger" onClick={() => goToDeleteProcAssig(pa)}>
                          Excluir
                        </Button>
                      </PrivateGroup>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item" key="no-assig">
                Sem cargos associados
              </li>
            )}
          </ul>
          <div className="mb-1">
            <LinkContainer to={`/process/read/${process ? process.id : ''}`}>
              <Button>Pronto</Button>
            </LinkContainer>
          </div>
        </Card.Body>
      </Card>
    )
  }

  const renderCreate = () => {
    return (
      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Criar atribuição de cargo</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={onSubmit}>
            {errors.id ? (
              <Alert className="my-2" variant="danger">
                {errors.id} || {errors.process_id}
              </Alert>
            ) : null}

            <SelectField
              label="Cargo"
              name="assignment_id"
              value={createData.assignment_id}
              onChange={onChange}
              options={assignmentOptions}
              error={errors.assignment_id}
            />

            <Button variant="primary" type="submit">
              Enviar
            </Button>

            <Button className="ml-1" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }

  const renderDelete = () => {
    return (
      <Card className="mt-2 mx-2" border="danger">
        <Card.Header as="h5" className="bg-danger">
          <span className="text-light"> Excluir atribuição de cargo </span>
        </Card.Header>
        <Card.Body>
          <p>Tem certeza que deseja excluir a seguinte atribuição de cargo?</p>

          <dl className="row mb-0">
            <dt className="col-sm-3">Cargo:</dt>
            <dd className="col-sm-9">{assignments.find(assig => assig.id === deleteData.assignment_id).name}</dd>
          </dl>

          <div className="mt-2">
            <Button variant="danger" onClick={() => onDeletePA(deleteData.id)}>
              Excluir
            </Button>

            <Button className="ml-1" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </Card.Body>
      </Card>
    )
  }

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

        <Breadcrumb.Item active={mode === 'list' ? true : false} onClick={() => setMode('list')}>
          {`Atribuições de cargo`}
        </Breadcrumb.Item>

        {mode === 'create' ? (
          <Breadcrumb.Item active={mode === 'create' ? true : false}>{`Nova atribuição de cargo`}</Breadcrumb.Item>
        ) : null}

        {mode === 'delete' ? (
          <Breadcrumb.Item
            active={mode === 'delete' ? true : false}
          >{`Excluir excluir atribuição de cargo`}</Breadcrumb.Item>
        ) : null}
      </Breadcrumb>

      <ErrorAlert errorStore={errorStore} />
      {mode === 'list' ? renderList() : null}
      {mode === 'create' ? renderCreate() : null}
      {mode === 'delete' ? renderDelete() : null}
    </React.Fragment>
  )
}

export default ProcAssigCrudByProc
