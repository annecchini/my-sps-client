import React from 'react'
import { Link } from 'react-router-dom'

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
          className={`btn ${active ? 'btn-primary' : 'btn-outline-primary'}`}
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
      <div className="box">
        <PrivateGroup permission="process_create">
          <Link className="btn btn-primary" to="/process/create">
            Novo Processo
          </Link>
        </PrivateGroup>
      </div>

      <div className="box">
        <h6>Filtros</h6>
        <div className="wrapper">
          <MultiSelectFilter id="years" filter={filters.years} onTick={tickFilter} />
          <MultiSelectFilter id="graduationLevels" filter={filters.graduationLevels} onTick={tickFilter} />
          <MultiSelectFilter id="courses" filter={filters.courses} onTick={tickFilter} />
          <MultiSelectFilter id="assignments" filter={filters.assignments} onTick={tickFilter} />
          <div>
            <input className="btn btn-primary" type="button" value="Limpar" onClick={clearFilters} />
          </div>
        </div>

        <h6>Lista de processos</h6>
        <ul className="mb-2 list-group list-to-table">
          {processes.map(process => {
            return (
              <li key={process.id} className="list-group-item">
                <p>
                  <Link to={`/process/read/${process.id}`}>{`${process.identifier}/${process.year}`}</Link>
                </p>
                <p>{checkNested(process, 'course', 'graduationLevel') ? process.course.graduationLevel.name : null}</p>
                <p>{checkNested(process, 'course') ? process.course.name : null}</p>
                <p>
                  {process.assignments.length > 0 ? (
                    process.assignments.map(assig => <span>{`${assig.name} `}</span>)
                  ) : (
                    <span>{'Sem atribuições associadas'}</span>
                  )}
                </p>
              </li>
            )
          })}
        </ul>
        {renderPagination(info)}
      </div>
    </React.Fragment>
  )
}
export default ProcessList
