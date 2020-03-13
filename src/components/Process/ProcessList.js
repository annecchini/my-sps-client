import React from 'react'
import { Link } from 'react-router-dom'

import MultiSelectFilter from '../MultiSelectFilter'

const ProcessListV2 = props => {
  const { filters, tickFilter, clearFilters, info, changePage } = props
  const processes = props.processes

  const renderPagination = info => {
    let pagination = []
    for (let i = 1; i <= info.numberOfPages; i++) {
      const active = i === info.currentPage ? '*' : null
      pagination[i] = (
        <button key={i} onClick={() => changePage(i, 10)}>
          {i}
          {active}
        </button>
      )
    }
    return pagination
  }

  return (
    <div className="box">
      <p>Novo Processo</p>
      <Link to="/process/create">Novo Processo</Link>

      <p>Filtros</p>
      <MultiSelectFilter id="years" filter={filters.years} onTick={tickFilter} />
      <MultiSelectFilter id="graduationLevels" filter={filters.graduationLevels} onTick={tickFilter} />
      <MultiSelectFilter id="courses" filter={filters.courses} onTick={tickFilter} />
      <MultiSelectFilter id="assignments" filter={filters.assignments} onTick={tickFilter} />
      <input type="button" value="Limpar" onClick={clearFilters} />

      <p>ProcessList</p>
      <ul className="list-group">
        {processes.map(process => {
          return (
            <li key={process.id} className="list-group-item">
              <p>
                <Link to={`/process/read/${process.id}`}>{`${process.identifier}/${process.year}`}</Link>
              </p>
              <p>{`${
                process.course ? (process.course.graduationLevel ? process.course.graduationLevel.name : null) : null
              }`}</p>
              <p>{process.course ? process.course.name : null}</p>
              <p>
                {process.assignments.length > 0
                  ? process.assignments.map(assig => `${assig.name} `)
                  : 'Sem atribuições associadas'}
              </p>
            </li>
          )
        })}
      </ul>

      <p>Paginação</p>
      {renderPagination(info)}
    </div>
  )
}
export default ProcessListV2
