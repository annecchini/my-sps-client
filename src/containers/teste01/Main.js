import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { clearErrors } from '../../store/actions/error'
import { listAssignment } from '../../store/actions/assignment'
import { readProcess } from '../../store/actions/process'
import { selectAssignments } from '../../store/selectors/assignment'
import { selectProcessById } from '../../store/selectors/process'
import { selectCourseByProcessIdV2 } from '../../store/selectors/course'
import { selectProcessAssignmentByProcessIdV2 } from '../../store/selectors/processAssignment'
import { convertObjetsToOptions } from '../../utils/store-helpers'
import { createProcessAssignment, deleteProcessAssignment } from '../../store/actions/processAssigment'
import { convertErrorsFormat } from '../../utils/error-helpers'

import List from './List'
import Create from './Create'
import Delete from './Delete'
import NotFound from '../../components/Layout/NotFound'

const Main = (props) => {
  const { errorStore, processAssignments, assignments } = props
  const initialState = { process_id: props.match.params.process_id, assignment_id: '' }

  const [createData, setCreateData] = useState(initialState) // eslint-disable-line
  const [deleteData, setDeleteData] = useState(initialState) // eslint-disable-line
  const [errors, setErrors] = useState({})

  //mostras apenas Assig sem processAssig
  const assignmentsAvailable = assignments.filter(
    (assig) => !processAssignments.map((pa) => pa.assignment_id).includes(assig.id)
  )
  const assignmentOptions = convertObjetsToOptions(assignmentsAvailable, { label: 'name', value: 'id' })
  assignmentOptions.unshift({ label: 'Escolha o cargo', value: '' })

  //componentDidMount
  useEffect(() => {
    console.log('\nBuscando dados do servidor\n')
    props.clearErrors()
    props.listAssignment()
    props.readProcess(props.match.params.process_id, {
      withCourse: true,
      withProcessAssignment: true,
      withAssignment: false,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //Pegar errors do store (onPropsUpdate)
  useEffect(() => {
    const storeErrors =
      errorStore.data && errorStore.data.devMessage && errorStore.data.devMessage.errors
        ? errorStore.data.devMessage.errors
        : []
    if (storeErrors.length > 0) {
      setErrors({ ...convertErrorsFormat(storeErrors) })
    }
  }, [errorStore])

  const allProps = {
    ...props,
    errors: errors,
    assignmentOptions: assignmentOptions,
    createData: createData,
    deleteData: deleteData,
  }

  return (
    <Switch>
      <Route exact path={`${props.match.path}`} render={(props) => <List {...allProps} />} />
      <Route exact path={`${props.match.path}/create`} render={(props) => <Create {...allProps} />} />
      <Route exact path={`${props.match.path}/delete`} render={(props) => <Delete {...allProps} />} />
      <Route component={NotFound} />
    </Switch>
  )
}

//Put store-data on props
const mapStateToProps = (state, ownProps) => ({
  errorStore: state.errorStore,
  assignments: selectAssignments(state),
  process: selectProcessById(state, ownProps.match.params.process_id, { withCourse: false }),
  course: selectCourseByProcessIdV2(state, ownProps.match.params.process_id, { withGraduationLevel: false }),
  processAssignments: selectProcessAssignmentByProcessIdV2(state, ownProps.match.params.process_id, {withAssignment: false}) //prettier-ignore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listAssignment,
  readProcess,
  createProcessAssignment,
  deleteProcessAssignment,
}

export default connect(mapStateToProps, mapActionsToProps)(Main)
