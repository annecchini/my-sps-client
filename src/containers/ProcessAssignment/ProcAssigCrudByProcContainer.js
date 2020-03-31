import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

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
import ProcAssigCrudByProc from '../../components/ProcessAssignment/ProcAssigCrudByProc'

const ProcAssigCrudByProcContainer = props => {
  const { errorStore, processAssignments, assignments } = props
  const initialState = { process_id: props.match.params.process_id, assignment_id: '' }

  const [createData, setCreateData] = useState(initialState)
  const [deleteData, setDeleteData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [mode, setMode] = useState('list')

  //mostras apenas Assig sem processAssig
  const assignmentsAvailable = assignments.filter(
    assig => !processAssignments.map(pa => pa.assignment_id).includes(assig.id)
  )
  const assignmentOptions = convertObjetsToOptions(assignmentsAvailable, { label: 'name', value: 'id' })
  assignmentOptions.unshift({ label: 'Escolha o cargo', value: '' })

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listAssignment()
    props.readProcess(props.match.params.process_id, {
      withCourse: true,
      withProcessAssignment: true,
      withAssignment: false
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

  const onChange = e => {
    e.preventDefault()
    setCreateData({ ...createData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    props.createProcessAssignment(createData, {
      callbackOk: () => {
        setMode('list')
        setCreateData({ ...createData, assignment_id: '' })
      }
    })
  }

  const onCancel = () => {
    setMode('list')
    setCreateData({ ...createData, assignment_id: '' })
    setDeleteData({ ...createData, assignment_id: '' })
  }

  const onDeletePA = id => {
    props.deleteProcessAssignment(id, {
      callbackOk: () => {
        setMode('list')
      }
    })
  }

  const goToCreateProcAssig = () => {
    setCreateData(initialState)
    setMode('create')
  }

  const goToDeleteProcAssig = pa => {
    setDeleteData(pa)
    setMode('delete')
  }

  const allProps = {
    ...props,

    mode: mode,
    setMode: setMode,

    goToCreateProcAssig: goToCreateProcAssig,
    createData: createData,
    assignmentOptions: assignmentOptions,
    onChange: onChange,
    onSubmit: onSubmit,

    goToDeleteProcAssig: goToDeleteProcAssig,
    deleteData: deleteData,
    onDeletePA: onDeletePA,

    onCancel: onCancel,
    errors: errors
  }

  return <ProcAssigCrudByProc {...allProps} />
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
  deleteProcessAssignment
}

export default connect(mapStateToProps, mapActionsToProps)(ProcAssigCrudByProcContainer)
