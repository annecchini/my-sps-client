import React from 'react'
import { Link } from 'react-router-dom'

import { checkNested } from '../../utils/checkNested'
import PrivateGroup from '../../containers/Auth/PrivateGroup'

const ProcessRead = props => {
  const process = props.process || {}

  return (
    <React.Fragment>
      <div className="box">
        <PrivateGroup permission="process_update" course_id={process.course_id}>
          <p>
            <Link to={`/process/update/${process.id}`}>Update</Link>
          </p>
        </PrivateGroup>
        <PrivateGroup permission="process_delete" course_id={process.course_id}>
          <p>
            <Link to={`/process/delete/${process.id}`}>Delete</Link>
          </p>
        </PrivateGroup>
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
