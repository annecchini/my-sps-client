import React from 'react'
import { Breadcrumb, Button, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import PrivateGroup from '../../containers/Auth/PrivateGroup'
import ErrorAlert from '../../components/Error/ErrorAlert'

const List = props => {
  const { history, match } = props
  const { process, course, processAssignments, assignments, errorStore } = props

  console.log('ListProps: ', props)

  const renderList = () => {
    return (
      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Atribuições de cargo do processo</Card.Header>
        <Card.Body>
          {/* Lista de botões */}
          <div className="mb-1">
            <PrivateGroup permission="processAssignment_create" course_id={course ? course.id : false}>
              <Button
                onClick={() => {
                  history.push(`${match.url}/create`)
                }}
              >
                Nova atribuição de cargo
              </Button>
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
                        <Button
                          variant="danger"
                          onClick={() => {
                            history.push(`${match.url}/delete`)
                          }}
                        >
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

        <Breadcrumb.Item active onClick={() => {}}>
          {`Atribuições de cargo`}
        </Breadcrumb.Item>
      </Breadcrumb>

      <ErrorAlert errorStore={errorStore} />

      {renderList()}
    </React.Fragment>
  )
}

export default List
