import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { listProcess } from '../../store/actions/process'

const ProcessList = props => {
  //Baixar processos
  useEffect(() => {
    props.clearErrors()
    props.listProcess()
  })

  return (
    <div className="box">
      <p>ProcessList</p>
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
