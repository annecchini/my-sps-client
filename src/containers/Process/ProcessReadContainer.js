import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { readProcess } from '../../store/actions/process'
import ProcessRead from '../../components/Process/ProcessRead'
import { selectProcessById } from '../../store/selectors/process'

const ProcessCreateContainer = props => {
  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.readProcess(props.match.params.id, { withCourse: true, withAssignment: true })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const allProps = {
    ...props
  }

  return <ProcessRead {...allProps} />
}

//Put store-data on props
const mapStateToProps = (state, ownProps) => ({
  process: selectProcessById(state, ownProps.match.params.id, { withCourse: true, withAssignment: true }),
  errorStore: state.errorStore,
  authStore: state.authStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  readProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreateContainer)
