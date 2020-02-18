import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import { createProcess } from '../../store/actions/process'
import { convertErrorsFormat } from '../../utils/error-helpers'

const ProcessCreate = props => {
  const { errorStore } = props
  const initialCreateData = { identifier: '', year: '', course_id: '', descrition: '', visible: false }
  const [createData, setCreateData] = useState(initialCreateData)
  const [errors, setErrors] = useState({})
  const courses = props.courseStore

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
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
    props.createProcess(createData, () => {
      props.history.push('/process')
    })
  }

  const info = null

  return (
    <div className="box">
      <p>ProcessCreate</p>
      <form onSubmit={onSubmit}>
        <div>
          <label>Identificador</label>
          <input type="text" name="identifier" value={createData.identifier} onChange={onChange} />
          {info && <small>{info}</small>}
          {errors.identifier && <small>{errors.identifier}</small>}
        </div>

        <div>
          <label>Ano</label>
          <input type="text" name="year" value={createData.year} onChange={onChange} />
        </div>

        <div>
          <label>Curso</label>
          <input type="text" name="course_id" value={createData.course_id} onChange={onChange} />
        </div>

        <div>
          <label>Descrição</label>
          <textarea name="descrition" value={createData.description} onChange={onChange} />
        </div>

        <div>
          <input type="checkbox" name="visible" value={createData.visible} onChange={onChange} />
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
  createProcess
}

export default connect(mapStateToProps, mapActionsToProps)(ProcessCreate)
