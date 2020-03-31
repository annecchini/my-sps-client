import React from 'react'
import { Card, Button, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { checkNested } from '../../utils/checkNested'
import PrivateGroup from '../../containers/Auth/PrivateGroup'
import ErrorAlert from '../Error/ErrorAlert'
import isEmpty from '../../utils/is-empty'

const ProcessRead = props => {
  const process = props.process || {}
  const { errorStore } = props

  return (
    <React.Fragment>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to={`/process/read/${process.id}`}>
          <Breadcrumb.Item active>{`Processo ${process.identifier}/${process.year}`}</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>

      <ErrorAlert errorStore={errorStore} />

      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Processo seletivo</Card.Header>
        <Card.Body>
          {/* Lista de botões */}
          <div className="mb-1">
            <PrivateGroup permission="process_update" course_id={process.course_id}>
              <LinkContainer to={`/process/update/${props.match.params.id}`}>
                <Button>Editar processo</Button>
              </LinkContainer>
            </PrivateGroup>
            <PrivateGroup permission="process_delete" course_id={process.course_id}>
              <LinkContainer to={`/process/delete/${props.match.params.id}`}>
                <Button className="ml-1" variant="danger">
                  Excluir processo
                </Button>
              </LinkContainer>
            </PrivateGroup>
          </div>

          {/* Informações básicas: */}
          <Card>
            <Card.Body>
              <dl className="row mb-0">
                <dt className="col-sm-3">Idenficador:</dt>
                <dd className="col-sm-9">{process.identifier}</dd>

                <dt className="col-sm-3">Ano:</dt>
                <dd className="col-sm-9">{process.year}</dd>

                <dt className="col-sm-3">Nível:</dt>
                <dd className="col-sm-9">
                  {checkNested(process, 'course', 'graduationLevel', 'name')
                    ? process.course.graduationLevel.name
                    : 'Sem nível associado.'}
                </dd>

                <dt className="col-sm-3">Curso:</dt>
                <dd className="col-sm-9">
                  {checkNested(process, 'course', 'name') ? process.course.name : 'Sem curso associado.'}
                </dd>

                <dt className="col-sm-3">Descrição:</dt>
                <dd className="col-sm-9">{!isEmpty(process.description) ? process.description : 'Sem descrição.'}</dd>

                <dt className="col-sm-3">Cargos:</dt>
                <dd className="col-sm-9">
                  <ul className="list-inline mb-0">
                    {checkNested(process, 'assignments') && process.assignments.length > 0 ? (
                      process.assignments.map(assig => (
                        <li className="list-inline-item" key={assig.id}>{`${assig.name}`}</li>
                      ))
                    ) : (
                      <li className="list-inline-item" key="no-assig">
                        Sem cargos associados
                      </li>
                    )}
                    <li className="list-inline-item" key="process-assig-update">
                      <PrivateGroup permission="processAssignment_create" course_id={process.course_id}>
                        <LinkContainer to={`/process-assignment/by-process/${process.id}`}>
                          <Button>Editar cargos</Button>
                        </LinkContainer>
                      </PrivateGroup>
                    </li>
                  </ul>
                </dd>
              </dl>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default ProcessRead
