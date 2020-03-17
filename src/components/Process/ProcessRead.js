import React from 'react'
import { Link } from 'react-router-dom'

import { checkNested } from '../../utils/checkNested'

const ProcessRead = props => {
  const process = props.process || {}

  return (
    <React.Fragment>
      <div className="box">
        <p>
          <Link to={`/process/update/${process.id}`}>Update</Link>
        </p>
        <p>
          <Link to={`/process/delete/${process.id}`}>Delete</Link>
        </p>
      </div>
      <div className="box">
        <p>ProcessRead</p>
        <p>{`${process.identifier}/${process.year}`}</p>
        <p>{checkNested(process, 'course', 'graduationLevel') ? process.course.graduationLevel.name : null}</p>
        <p>{checkNested(process, 'course') ? process.course.name : null}</p>
        <p>
          {checkNested(process, 'assignments') && process.assignments.length > 0
            ? process.assignments.map(assig => `${assig.name} `)
            : 'Sem atribuições associadas.'}
        </p>
      </div>
    </React.Fragment>
  )
}

export default ProcessRead
