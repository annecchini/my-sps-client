import React from 'react'
import { Card, Button, Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { checkNested } from '../../utils/checkNested'
import ErrorAlert from '../Error/ErrorAlert'
import isEmpty from '../../utils/is-empty'

const ProcessDelete = props => {
  const process = props.process || {}
  const { onSubmit, errorStore } = props

  return (
    <React.Fragment>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to={`/process/read/${process.id}`}>
          <Breadcrumb.Item>{`Processo ${process.identifier}/${process.year}`}</Breadcrumb.Item>
        </LinkContainer>

        <LinkContainer to={`/process/delete/${process.id}`}>
          <Breadcrumb.Item active>Excluir processo</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>

      <ErrorAlert errorStore={errorStore} />

      <Card className="mt-2 mx-2" border="danger">
        <Card.Header as="h5" className="bg-danger">
          <span className="text-light"> Excluir processo</span>
        </Card.Header>
        <Card.Body>
          <p>Tem certeza que deseja excluir o seguinte processo?</p>

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
                  {checkNested(process, 'course') ? process.course.name : 'Sem curso associado.'}
                </dd>

                <dt className="col-sm-3">Descrição:</dt>
                <dd className="col-sm-9">{!isEmpty(process.description) ? process.description : 'Sem descrição.'}</dd>

                <dt className="col-sm-3">Atribuições:</dt>
                <dd className="col-sm-9">
                  <ul className="list-inline mb-0">
                    {checkNested(process, 'assignments') && process.assignments.length > 0 ? (
                      process.assignments.map(assig => (
                        <li className="list-inline-item" key={assig.id}>{`${assig.name}`}</li>
                      ))
                    ) : (
                      <li className="list-inline-item" key="no-assig">
                        Sem atribuições associadas.
                      </li>
                    )}
                  </ul>
                </dd>
              </dl>
            </Card.Body>
          </Card>

          <div className="mt-2">
            <Button variant="danger" onClick={onSubmit}>
              Excluir
            </Button>

            <Button className="ml-1" variant="secondary" onClick={props.history.goBack}>
              Cancelar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

export default ProcessDelete
