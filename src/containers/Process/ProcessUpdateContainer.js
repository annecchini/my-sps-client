import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clearErrors } from '../../store/actions/error'
import { updateProcess, readProcess } from '../../store/actions/process'
import { convertErrorsFormat } from '../../utils/error-helpers'
import { listCourse } from '../../store/actions/course'
import { convertObjetsToOptions } from '../../utils/store-helpers'
import ProcessUpdate from '../../components/Process/ProcessUpdate'
import { validateIdentifier, validateYear, validateCourseId, validateBody } from '../../validation/process'
import { selectProcessById } from '../../store/selectors/process'
import { selectCoursesByAccess } from '../../store/selectors/course'

const ProcessCreateContainer = props => {
  const process = props.process || {}
  const { errorStore } = props
  const initialUpdateData = { identifier: '', year: '', course_id: '', description: '', visible: false }
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [errors, setErrors] = useState({})
  const courseOptions = convertObjetsToOptions(props.coursesAvailable, { label: 'name', value: 'id' })
  courseOptions.unshift({ label: 'Escolha o curso', value: '' })

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listCourse()
    props.readProcess(props.match.params.id, { withCourse: false, withAssignment: false })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //Carregar valores no formulário
  useEffect(() => {
    setUpdateData({
      identifier: process.identifier ? process.identifier : '',
      year: process.year ? process.year : '',
      course_id: process.course_id ? process.course_id : '',
      description: process.description ? process.description : '',
      visible: process.visible ? process.visible : false
    })
  }, [process])

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
    let fieldError = null

    switch (e.target.name) {
      case 'identifier':
        fieldError = validateIdentifier(e.target.value, 'update')
        break
      case 'year':
        fieldError = validateYear(e.target.value, 'update')
        break
      case 'course_id':
        fieldError = validateCourseId(e.target.value, 'update')
        break
      default:
        break
    }

    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    if (fieldError) setErrors({ ...errors, [e.target.name]: fieldError })
    else setErrors(_.omit(errors, e.target.name))
  }

  const onCheck = e => {
    setUpdateData({ ...updateData, [e.target.name]: !updateData[e.target.name] })
  }

  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(updateData, 'update')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      props.updateProcess(process.id, updateData, {
        callbackOk: process => {
          props.history.push(`/process/read/${process.id}`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    updateData: updateData,
    courseOptions: courseOptions,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit,
    errors: errors
  }

  return <ProcessUpdate {...allProps} />
}

//Put store-data on props
const mapStateToProps = (state, ownProps) => ({
  errorStore: state.errorStore,
  process: selectProcessById(state, ownProps.match.params.id, { withCourse: true, withAssignment: true }),
  coursesAvailable: selectCoursesByAccess(state, { permission: 'process_update' })
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  updateProcess,
  listCourse,
  readProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreateContainer)
