import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { readProcess, deleteProcess } from '../../store/actions/process'
import ProcessDelete from '../../components/Process/ProcessDelete'
import { selectProcessById } from '../../store/selectors/process'

const ProcessCreateContainer = props => {
  const process = props.process || {}

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.readProcess(props.match.params.id, { withCourse: true, withProcessAssignment: true })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = e => {
    e.preventDefault()
    props.deleteProcess(process.id, {
      callbackOk: () => {
        props.history.push(`/process`)
      }
    })
  }

  const allProps = {
    ...props,
    onSubmit: onSubmit
  }

  return <ProcessDelete {...allProps} />
}

//Put store-data on props
const mapStateToProps = (state, ownProps) => ({
  process: selectProcessById(state, ownProps.match.params.id, { withCourse: true, withAssignment: true }),
  errorStore: state.errorStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  readProcess,
  deleteProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreateContainer)
