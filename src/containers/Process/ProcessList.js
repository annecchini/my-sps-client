import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { listProcess } from '../../store/actions/process'

const ProcessList = props => {
  const { clearErrors, listProcess } = props

  //Baixar processos
  useEffect(() => {
    clearErrors()
    listProcess()
  }, [clearErrors, listProcess])

  return (
    <div className="box">
      <p>ProcessList</p>
      <ul>
        {props.processStore.processes.map(process => {
          return <li key={process.id}>{`${process.identifier}/${process.year}`}</li>
        })}
      </ul>
    </div>
  )
}

//Put store-data on props
const mapStateToProps = state => ({
  processStore: state.processStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessList)
