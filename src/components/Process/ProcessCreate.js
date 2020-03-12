import React from 'react'

import TextField from '../TextField'
import TextAreaField from '../TextAreaField'
import SelectField from '../SelectField'
import CheckboxField from '../CheckboxField'

const ProcessCreate = props => {
  const { onSubmit, createData, onChange, onCheck, errors, courseOptions } = props
  return (
    <div className="box">
      <p>ProcessCreate</p>
      <form onSubmit={onSubmit}>
        <div>{errors.id ? errors.id : null}</div>

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

        <CheckboxField
          label="Visível"
          name="visible"
          checked={createData.visible}
          error={errors.visible}
          onChange={onCheck}
        />

        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default ProcessCreate
