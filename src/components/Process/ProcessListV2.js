import React from 'react'
import { Link } from 'react-router-dom'

import MultiSelectFilter from '../MultiSelectFilter'

const ProcessList = props => {
  const { filters, tickFilter, clearFilters, pager } = props
  const processes = props.processes_V2

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
      <ul className="list-group" style={{ diplay: 'table' }}>
        {processes.map(process => {
          return (
            <li key={process.id} className="list-group-item">
              <p>{`${process.identifier}/${process.year}`}</p>
              <p>{`${
                process.course ? (process.course.graduationLevel ? process.course.graduationLevel.name : null) : null
              }`}</p>
              <p>{process.course ? process.course.name : null}</p>
            </li>
          )
        })}
      </ul>

      <p>Paginação</p>
      {pager}
    </div>
  )
}
export default ProcessList
