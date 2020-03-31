import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Dropdown, ButtonGroup, Button, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { checkNested } from '../../utils/checkNested'
import MultiSelectFilter from '../MultiSelectFilter'
import PrivateGroup from '../../containers/Auth/PrivateGroup'
import PaginationGroup from '../../components/PaginationGroup'
import ErrorAlert from '../../components/Error/ErrorAlert'

const ProcessList = props => {
  const { filters, tickFilter, clearFilters, info, changePage, errorStore } = props
  const processes = props.processes

  const listAllAppliedfilters = filters => {
    const appliedFilters = []
    const indexes = Object.keys(filters)

    for (let index of indexes) {
      const applied = filters[index].filter(item => item.applied === true)
      applied.map(ap => appliedFilters.push({ id: index, ...ap }))
    }

    return appliedFilters
  }

  return (
    <React.Fragment>
      <ErrorAlert errorStore={errorStore} />

      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Processos seletivos</Card.Header>
        <Card.Body>
          {/* Lista de botões */}
          <div className="mb-1">
            <PrivateGroup permission="process_create">
              <LinkContainer to="/process/create">
                <Button>Novo Processo</Button>
              </LinkContainer>
            </PrivateGroup>
          </div>

          {/* Lista de filtros */}
          <ul className="mb-1 list-group li-tb">
            <li className="list-group-item">
              <div>
                <Dropdown className="d-block" as={ButtonGroup}>
                  <Dropdown.Toggle block id="dd-year">
                    Ano
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <MultiSelectFilter id="years" filter={filters.years} onTick={tickFilter} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Dropdown className="d-block" as={ButtonGroup}>
                  <Dropdown.Toggle block id="dd-graduationLevel">
                    Nível
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <MultiSelectFilter id="graduationLevels" filter={filters.graduationLevels} onTick={tickFilter} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Dropdown className="d-block" as={ButtonGroup}>
                  <Dropdown.Toggle block id="dd-course">
                    Curso
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <MultiSelectFilter id="courses" filter={filters.courses} onTick={tickFilter} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Dropdown className="d-block" as={ButtonGroup}>
                  <Dropdown.Toggle block id="dd-assignment">
                    Cargo
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <MultiSelectFilter id="assignments" filter={filters.assignments} onTick={tickFilter} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Button block onClick={clearFilters}>
                  Limpar
                </Button>
              </div>
            </li>
          </ul>

          {/* Filtros aplicados */}
          {listAllAppliedfilters(filters).length > 0 ? (
            <div className="mb-1">
              {listAllAppliedfilters(filters).map((item, key) => (
                <Badge className="mx-1" variant="primary" key={key}>
                  {item.label}{' '}
                  <a href="javascript;" className="text-light" onClick={tickFilter(item.id, item.value)}>
                    X
                  </a>
                </Badge>
              ))}
            </div>
          ) : null}

          {/* Lista de procesos */}
          <ul className="mb-1 list-group li-tb">
            {processes.length > 0 ? (
              processes.map(process => {
                return (
                  <li key={process.id} className="list-group-item">
                    <p>
                      <Link to={`/process/read/${process.id}`}>{`${process.identifier}/${process.year}`}</Link>
                    </p>
                    <p>
                      {checkNested(process, 'course', 'graduationLevel', 'name')
                        ? process.course.graduationLevel.name
                        : null}
                    </p>
                    <p>{checkNested(process, 'course', 'name') ? process.course.name : null}</p>
                    <p>
                      {process.assignments.length > 0 ? (
                        process.assignments.map(assig => <span key={assig.id}>{`${assig.name} `}</span>)
                      ) : (
                        <span>Sem cargos associados</span>
                      )}
                    </p>
                    <p>
                      <LinkContainer to={`/process/read/${process.id}`}>
                        <Button block variant="outline-primary">
                          Acessar
                        </Button>
                      </LinkContainer>
                    </p>
                  </li>
                )
              })
            ) : (
              <li className="list-group-item">
                <p>Sem resultados para exibir.</p>
              </li>
            )}
          </ul>
          <div className="d-flex justify-content-center">
            <PaginationGroup nPages={info.numberOfPages} cPage={info.currentPage} changePage={changePage} />
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}
export default ProcessList
