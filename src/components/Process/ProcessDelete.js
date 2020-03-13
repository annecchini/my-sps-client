import React from 'react'

import { checkNested } from '../../utils/checkNested'

const ProcessDelete = props => {
  const process = props.process || {}
  const { onSubmit } = props

  return (
    <div className="box">
      <p>ProcessRead</p>

      <p>{`${process.identifier}/${process.year}`}</p>
      <p>{checkNested(process, 'course', 'graduationLevel', 'name') ? process.course.graduationLevel.name : null}</p>
      <p>{checkNested(process, 'course', 'name') ? process.course.name : null}</p>
      <p>
        {checkNested(process, 'assignments') && process.assignments.length > 0
          ? process.assignments.map(assig => `${assig.name} `)
          : 'Sem atribuições associadas.'}
      </p>

      <input type="button" value="Excluir" className="btn btn-primary btn-block mt-4" onClick={onSubmit} />
    </div>
  )
}

export default ProcessDelete
