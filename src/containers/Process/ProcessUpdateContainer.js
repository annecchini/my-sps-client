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
import isEmpty from '../../utils/is-empty'

const ProcessCreateContainer = props => {
  const process = props.process || {}
  const { errorStore, processLoading } = props
  const initialUpdateData = { identifier: '', year: '', course_id: '', description: '', visible: false }
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [readyToLoad, setReadyToLoad] = useState(false)
  const [loaded, setLoaded] = useState(false)
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
  const haveProcess = !isEmpty(props.process) && processLoading === false
  useEffect(() => {
    if (haveProcess) setReadyToLoad(haveProcess)
  }, [haveProcess])

  useEffect(() => {
    if (readyToLoad && !loaded) {
      setUpdateData({
        identifier: process.identifier ? process.identifier : '',
        year: process.year ? process.year : '',
        course_id: process.course_id ? process.course_id : '',
        description: process.description ? process.description : '',
        visible: process.visible ? process.visible : false
      })
      setLoaded(true)
    }
  }, [readyToLoad, loaded, process])

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
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'identifier':
        errorList[e.target.name] = validateIdentifier(e.target.value, 'update')
        if (newErrors['year']) errorList['year'] = validateYear(updateData.year, 'update')
        break
      case 'year':
        if (newErrors['identifier']) errorList['identifier'] = validateIdentifier(updateData.identifier, 'update')
        errorList[e.target.name] = validateYear(e.target.value, 'update')
        break
      case 'course_id':
        errorList[e.target.name] = validateCourseId(e.target.value, 'update')
        break
      default:
        break
    }

    //remove errors if needed
    const toRemove = Object.keys(errorList).filter(key => typeof errorList[key] === 'undefined')
    if (!isEmpty(toRemove)) newErrors = _.omit(newErrors, toRemove)

    //add errors if needed
    const toAdd = {}
    Object.keys(errorList)
      .filter(key => typeof errorList[key] !== 'undefined')
      .map(key => (toAdd[key] = errorList[key]))
    if (!isEmpty(toAdd)) newErrors = { ...newErrors, ...toAdd }

    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    setErrors(newErrors)
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
  processLoading: state.processStore.loading,
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
