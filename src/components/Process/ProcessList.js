import React from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Card, Dropdown, ButtonGroup, Button } from 'react-bootstrap'

import { checkNested } from '../../utils/checkNested'
import MultiSelectFilter from '../MultiSelectFilter'
import PrivateGroup from '../../containers/Auth/PrivateGroup'

const ProcessList = props => {
  const { filters, tickFilter, clearFilters, info, changePage } = props
  const processes = props.processes

  const renderPagination = info => {
    let pagination = []
    for (let i = 1; i <= info.numberOfPages; i++) {
      const active = i === info.currentPage ? '*' : null
      pagination[i] = (
        <button
          className={`mx-1 btn ${active ? 'btn-primary' : 'btn-outline-primary'}`}
          key={i}
          onClick={() => changePage(i, 10)}
        >
          {i}
        </button>
      )
    }
    return pagination
  }

  return (
    <React.Fragment>
      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Processos seletivos</Card.Header>
        <Card.Body>
          {/* Lista de botões */}
          <div className="">
            <PrivateGroup permission="process_create">
              <Link className="mx-1 my-1 btn btn-primary" to="/process/create">
                Novo Processo
              </Link>
            </PrivateGroup>
          </div>

          {/* Lista de filtros */}
          <div className="box">
            <Dropdown className="mx-1 my-1 d-block d-sm-inline-block" as={ButtonGroup}>
              <Dropdown.Toggle block id="dd-year">
                Ano
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <MultiSelectFilter id="years" filter={filters.years} onTick={tickFilter} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mx-1 my-1 d-block d-sm-inline-block" as={ButtonGroup}>
              <Dropdown.Toggle block id="dd-graduationLevel">
                Nível
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <MultiSelectFilter id="graduationLevels" filter={filters.graduationLevels} onTick={tickFilter} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mx-1 my-1 d-block d-sm-inline-block" as={ButtonGroup}>
              <Dropdown.Toggle block id="dd-course">
                Curso
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <MultiSelectFilter id="courses" filter={filters.courses} onTick={tickFilter} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mx-1 my-1 d-block d-sm-inline-block" as={ButtonGroup}>
              <Dropdown.Toggle block id="dd-assignment">
                Atribuição
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <MultiSelectFilter id="assignments" filter={filters.assignments} onTick={tickFilter} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button className="my-1" block variant="primary">
              Block level button
            </Button>

            <input className="btn btn-primary btn-sm-block" type="button" value="Limpar" onClick={clearFilters} />
          </div>

          {/* Lista de procesos */}
          <ul className="mb-2 list-group list-to-table">
            {processes.map(process => {
              return (
                <li key={process.id} className="list-group-item">
                  <p>
                    <Link to={`/process/read/${process.id}`}>{`${process.identifier}/${process.year}`}</Link>
                  </p>
                  <p>
                    {checkNested(process, 'course', 'graduationLevel') ? process.course.graduationLevel.name : null}
                  </p>
                  <p>{checkNested(process, 'course') ? process.course.name : null}</p>
                  <p>
                    {process.assignments.length > 0 ? (
                      process.assignments.map(assig => <span key={assig.id}>{`${assig.name} `}</span>)
                    ) : (
                      <span>{'Sem atribuições associadas'}</span>
                    )}
                  </p>
                </li>
              )
            })}
          </ul>
          <div className="d-flex justify-content-center">{renderPagination(info)}</div>
        </Card.Body>
      </Card>

      <div className="box">
        <h4>Filtros</h4>

        <Accordion className="mb-2">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Ano: Sem filtros aplicados.
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <MultiSelectFilter id="years" filter={filters.years} onTick={tickFilter} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Nível de graduação: Sem filtros aplicados.
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <MultiSelectFilter id="graduationLevels" filter={filters.graduationLevels} onTick={tickFilter} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Curso: Sem filtros aplicados.
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <MultiSelectFilter id="courses" filter={filters.courses} onTick={tickFilter} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              Atribuições: Sem filtros aplicados.
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <MultiSelectFilter id="assignments" filter={filters.assignments} onTick={tickFilter} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </React.Fragment>
  )
}
export default ProcessList
