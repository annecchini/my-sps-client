import React from 'react'

import TextField from '../TextField'
import TextAreaField from '../TextAreaField'
import SelectField from '../SelectField'

const ProcessCreate = props => {
  const { onSubmit, createData, onChange, onCheck, errors, courseOptions } = props
  return (
    <div className="box">
      <p>ProcessCreate</p>
      <form onSubmit={onSubmit}>
        {errors.id ? errors.id : null}

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

export default ProcessCreate
