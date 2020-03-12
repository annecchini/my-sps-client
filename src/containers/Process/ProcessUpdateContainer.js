import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clearErrors } from '../../store/actions/error'
import { createProcess } from '../../store/actions/process'
import { convertErrorsFormat } from '../../utils/error-helpers'
import { listCourse } from '../../store/actions/course'
import { convertStoreToOptions } from '../../utils/store-helpers'
import ProcessCreate from '../../components/Process/ProcessCreate'
import { validateIdentifier, validateYear, validateCourseId } from '../../validation/process'

const ProcessCreateContainer = props => {
  const { errorStore } = props
  const initialCreateData = { identifier: '', year: '', course_id: '', description: '', visible: false }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})
  const courseOptions = convertStoreToOptions(props.courseStore)
  courseOptions.unshift({ label: 'Escolha o curso', value: '' })

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
    props.readProcess(props.match.params.id)
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
    props.createProcess(createData, process => {
      props.history.push(`/process/${process.id}`)
    })
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
const mapStateToProps = state => ({
  errorStore: state.errorStore,
  courseStore: state.courseStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  createProcess,
  listCourse
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreateContainer)
