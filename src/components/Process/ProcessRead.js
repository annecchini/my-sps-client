import React from 'react'

import { checkNested } from '../../utils/checkNested'

const ProcessRead = props => {
  const process = props.process || {}

  return (
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
  )
}

export default ProcessRead
