import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Dropdown, ButtonGroup, Button, Badge, Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { checkNested } from '../../utils/checkNested'
import MultiSelectFilter from '../MultiSelectFilter'
import PrivateGroup from '../../containers/Auth/PrivateGroup'

const ProcessList = props => {
  const { filters, tickFilter, clearFilters, info, changePage } = props
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

  const renderPagination2 = (nPages, cPage) => {
    if (nPages === 1) return null

    const paginationSize = 5 //impar
    const pages = [...Array(paginationSize).keys()]
      .map(x => cPage + x - (paginationSize - 1) / 2)
      .filter(x => x > 0 && x <= nPages)

    return (
      <Pagination>
        <Pagination.First onClick={() => changePage(1, 10)} />

        <Pagination.Prev
          active={cPage > 1 ? true : false}
          onClick={() => {
            if (cPage - 1 > 0) return changePage(cPage - 1, 10)
            else return null
          }}
        />

        {pages[0] > 1 ? <Pagination.Ellipsis /> : null}

        {pages.map((x, key) => (
          <Pagination.Item key={key} active={x === cPage ? true : false} onClick={() => changePage(x, 10)}>
            {x}
          </Pagination.Item>
        ))}

        {pages[paginationSize - 1] < nPages ? <Pagination.Ellipsis /> : null}

        <Pagination.Next
          active={cPage < nPages ? true : false}
          onClick={() => {
            if (cPage + 1 <= nPages) return changePage(cPage + 1, 10)
            else return null
          }}
        />

        <Pagination.Last onClick={() => changePage(nPages, 10)} />
      </Pagination>
    )
  }

  return (
    <React.Fragment>
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
                    Atribuição
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
                  <p>
                    <LinkContainer to={`/process/read/${process.id}`}>
                      <Button>Acessar</Button>
                    </LinkContainer>
                  </p>
                </li>
              )
            })}
          </ul>
          <div className="d-flex justify-content-center">{renderPagination2(info.numberOfPages, info.currentPage)}</div>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}
export default ProcessList
