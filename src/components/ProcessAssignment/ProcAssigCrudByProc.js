import React from 'react'
import { Card, Form, Alert, Button, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import ErrorAlert from '../../components/Error/ErrorAlert'
import SelectField from '../../components/SelectField'
import PrivateGroup from '../../containers/Auth/PrivateGroup'

const ProcAssigCrudByProc = (props) => {
  const { history, match } = props
  const { errorStore, process, course, processAssignments, assignments } = props
  const {
    initialState,
    createData,
    setCreateData,
    assignmentOptions,
    onChange,
    onSubmitCreate,
    deleteData,
    setDeleteData,
    onSubmitDelete,
    errors,
  } = props

  const onClickGoCreate = () => {
    setCreateData(initialState)
    history.push(`${match.url}#create`)
  }

  const onClickGoDelete = (pa) => {
    setDeleteData(pa)
    history.push(`${match.url}#delete`)
  }

  const onClickGoList = () => {
    setCreateData(initialState)
    setDeleteData(initialState)
    if (history.length > 1) history.goBack()
    else history.push(`${match.url}#list`)
  }

  const onClickCreate = (e) => {
    e.preventDefault()
    onSubmitCreate({
      callbackOk: () => {
        if (history.length > 1) history.goBack()
        else history.push(`${match.url}#list`)
      },
    })
  }

  const onClickDelete = (id) => {
    onSubmitDelete(id, {
      callbackOk: () => {
        if (history.length > 1) history.goBack()
        else history.push(`${match.url}#list`)
      },
    })
  }

  const renderList = () => {
    return (
      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Atribuições de cargo do processo</Card.Header>
        <Card.Body>
          {/* Lista de botões */}
          <div className="mb-2">
            <PrivateGroup permission="processAssignment_create" course_id={course ? course.id : false}>
              <Button onClick={() => onClickGoCreate()}>Nova atribuição de cargo</Button>
            </PrivateGroup>
          </div>
          {/* Lista de atrbuições de cargo */}
          <ul className="list-group mb-2">
            {processAssignments && processAssignments.length > 0 ? (
              processAssignments.map((pa) => (
                <li className="list-group-item" key={pa.id}>
                  <div className="row">
                    <div className="col d-flex align-items-center">{`${
                      assignments.find((assig) => assig.id === pa.assignment_id).name
                    }`}</div>
                    <div className="col d-flex  d-flex align-items-center justify-content-end">
                      <PrivateGroup permission="processAssignment_delete" course_id={course ? course.id : false}>
                        <Button variant="danger" onClick={() => onClickGoDelete(pa)}>
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
          <div className="mb-2">
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
          <Form noValidate onSubmit={(e) => onClickCreate(e)}>
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

            <Button className="ml-1" variant="secondary" onClick={() => onClickGoList()}>
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
          <span className="text-light">Excluir atribuição de cargo </span>
        </Card.Header>
        <Card.Body>
          <p>Tem certeza que deseja excluir a seguinte atribuição de cargo?</p>

          {deleteData.assignment_id ? (
            <dl className="row mb-0">
              <dt className="col-sm-3">Cargo:</dt>
              <dd className="col-sm-9">{assignments.find((assig) => assig.id === deleteData.assignment_id).name}</dd>
            </dl>
          ) : (
            <p>Atribuição de cargo não selecionada.</p>
          )}

          <div className="mt-2">
            <Button variant="danger" onClick={() => onClickDelete(deleteData.id)}>
              Excluir
            </Button>

            <Button className="ml-1" variant="secondary" onClick={() => onClickGoList()}>
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

        <Breadcrumb.Item active={history.location.hash === '#list' ? true : false} onClick={() => onClickGoList()}>
          {`Atribuições de cargo`}
        </Breadcrumb.Item>

        {history.location.hash === '#create' ? (
          <Breadcrumb.Item
            active={history.location.hash === '#create' ? true : false}
          >{`Nova atribuição de cargo`}</Breadcrumb.Item>
        ) : null}

        {history.location.hash === '#delete' ? (
          <Breadcrumb.Item
            active={history.location.hash === '#delete' ? true : false}
          >{`Excluir atribuição de cargo`}</Breadcrumb.Item>
        ) : null}
      </Breadcrumb>

      <ErrorAlert errorStore={errorStore} />
      {history.location.hash === '#list' ? renderList() : null}
      {history.location.hash === '#create' ? renderCreate() : null}
      {history.location.hash === '#delete' ? renderDelete() : null}
    </React.Fragment>
  )
}

export default ProcAssigCrudByProc
