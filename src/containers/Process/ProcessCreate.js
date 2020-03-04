import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { createProcess } from '../../store/actions/process'
import { convertErrorsFormat } from '../../utils/error-helpers'
import { listCourse } from '../../store/actions/course'
import TextField from '../../components/TextField'
import TextAreaField from '../../components/TextAreaField'
import SelectField from '../../components/SelectField'
import { convertStoreToOptions } from '../../utils/store-helpers'

const ProcessCreate = props => {
  const { errorStore } = props
  const initialCreateData = { identifier: '', year: '', course_id: '', description: '', visible: false }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})
  const courseOptions = convertStoreToOptions(props.courseStore)
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
    setCreateData({ ...createData, [e.target.name]: e.target.value })
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

  return (
    <div className="box">
      <p>ProcessCreate</p>
      <form onSubmit={onSubmit}>
        <TextField
          label="Identificador"
          type="text"
          name="identifier"
          value={createData.identifier}
          onChange={onChange}
          error={errors.identifier}
        />

        <TextField
          label="Ano"
          type="text"
          name="year"
          value={createData.year}
          onChange={onChange}
          error={errors.year}
        />

        <SelectField
          label="Curso"
          name="course_id"
          value={createData.course_id}
          onChange={onChange}
          options={courseOptions}
          error={errors.course_id}
        />

        <TextAreaField
          label="Descrição"
          name="description"
          value={createData.description}
          onChange={onChange}
          error={errors.description}
        />

        <div>
          <input type="checkbox" name="visible" value={createData.visible} onChange={onCheck} />
          <label>Visível</label>
        </div>

        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
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

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreate)
