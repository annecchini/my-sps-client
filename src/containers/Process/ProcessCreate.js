import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { createProcess } from '../../store/actions/process'
import { convertErrorsFormat } from '../../utils/error-helpers'

const ProcessCreate = props => {
  const { errorStore } = props
  const initialCreateForm = { identifier: '', year: '', course_id: '', descrition: '', visible: '' }
  const [createForm, setCreateForm] = useState(initialCreateForm)
  const [errors, setErrors] = useState({})

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //Pegar errors do store
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
    setCreateForm({ ...createForm, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log(createForm)
    props.createProcess(createForm, () => {
      props.history.push('/process')
    })
  }

  return (
    <div className="box">
      <p>ProcessCreate</p>
      <form onSubmit={onSubmit}>
        <label>Identificador</label>
        <input type="text" name="identifier" value={createForm.identifier} onChange={onChange} />
        <label>Ano</label>
        <input type="text" name="year" value={createForm.year} onChange={onChange} />
        <label>Curso</label>
        <input type="text" name="course_id" value={createForm.course_id} onChange={onChange} />
        <label>Descrição</label>
        <input type="text" name="descrition" value={createForm.description} onChange={onChange} />
        <label>Visível</label>
        <input type="text" name="visible" value={createForm.visible} onChange={onChange} />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

//Put store-data on props
const mapStateToProps = state => ({
  errorStore: state.errorStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  createProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreate)
