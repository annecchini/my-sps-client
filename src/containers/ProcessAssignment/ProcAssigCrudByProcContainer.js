import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

import ErrorAlert from '../../components/Error/ErrorAlert'
import { clearErrors } from '../../store/actions/error'
import { listAssignment } from '../../store/actions/assignment'
import { readProcess } from '../../store/actions/process'
import { selectAssignments } from '../../store/selectors/assignment'

import { selectProcessById } from '../../store/selectors/process'
import { selectCourseByProcessIdV2 } from '../../store/selectors/course'
import { selectProcessAssignmentByProcessIdV2 } from '../../store/selectors/processAssignment'

const ProcAssigCrudByProcContainer = props => {
  const { errorStore } = props

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listAssignment()
    props.readProcess(props.match.params.process_id, {
      withCourse: true,
      withGraduationLevel: false,
      withProcessAssignment: true,
      withAssignment: false
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // const allProps = {
  //   ...props
  // }

  console.log('\n')
  console.log('Variaveis:')
  console.log('process: ', props.process)
  console.log('course: ', props.course)
  console.log('procAssig: ', props.processAssigments)
  console.log('\n')

  return (
    <React.Fragment>
      <ErrorAlert errorStore={errorStore} />

      <Card className="mt-2 mx-2">
        <Card.Header as="h5">Atribuições de cargo do processo</Card.Header>
        <Card.Body></Card.Body>
      </Card>
    </React.Fragment>
  )
}

//Put store-data on props
const mapStateToProps = (state, ownProps) => ({
  errorStore: state.errorStore,
  assignmentsAvailable: selectAssignments(state),
  process: selectProcessById(state, ownProps.match.params.process_id, { withCourse: false }),
  course: selectCourseByProcessIdV2(state, ownProps.match.params.process_id, { withGraduationLevel: false }),
  processAssigments: selectProcessAssignmentByProcessIdV2(state, ownProps.match.params.process_id, {withAssignment: false}) //prettier-ignore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listAssignment,
  readProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcAssigCrudByProcContainer)
