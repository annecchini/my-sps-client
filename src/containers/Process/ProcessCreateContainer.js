import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clearErrors } from '../../store/actions/error'
import { createProcess } from '../../store/actions/process'
import { listCourse } from '../../store/actions/course'
import { convertErrorsFormat } from '../../utils/error-helpers'
import { convertObjetsToOptions } from '../../utils/store-helpers'
import ProcessCreate from '../../components/Process/ProcessCreate'
import { validateIdentifier, validateYear, validateCourseId, validateBody } from '../../validation/process'
import { selectCoursesByAccess } from '../../store/selectors/course'

const ProcessCreateContainer = props => {
  const { errorStore } = props
  const initialCreateData = { identifier: '', year: '', course_id: '', description: '', visible: false }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})
  const courseOptions = convertObjetsToOptions(props.coursesAvailable, { label: 'name', value: 'id' })
  courseOptions.unshift({ label: 'Escolha o curso', value: '' })

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.listCourse()
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
    let fieldError = null

    switch (e.target.name) {
      case 'identifier':
        fieldError = validateIdentifier(e.target.value, 'create')
        break
      case 'year':
        fieldError = validateYear(e.target.value, 'create')
        break
      case 'course_id':
        fieldError = validateCourseId(e.target.value, 'create')
        break
      default:
        break
    }

    setCreateData({ ...createData, [e.target.name]: e.target.value })
    if (fieldError) setErrors({ ...errors, [e.target.name]: fieldError })
    else setErrors(_.omit(errors, e.target.name))
  }

  const onCheck = e => {
    setCreateData({ ...createData, [e.target.name]: !createData[e.target.name] })
  }

  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBody(createData, 'create')

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      props.createProcess(createData, {
        callbackOk: process => {
          props.history.push(`/process/read/${process.id}`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    createData: createData,
    courseOptions: courseOptions,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit,
    errors: errors
  }

  return <ProcessCreate {...allProps} />
}

//Put store-data on props
const mapStateToProps = (state, ownProps) => ({
  errorStore: state.errorStore,
  coursesAvailable: selectCoursesByAccess(state, { permission: 'process_create' })
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  listCourse,
  createProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreateContainer)
