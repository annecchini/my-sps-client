import React from 'react'

import TextField from '../TextField'
import TextAreaField from '../TextAreaField'
import SelectField from '../SelectField'
import CheckboxField from '../CheckboxField'

const ProcessCreate = props => {
  const { onSubmit, updateData, onChange, onCheck, errors, courseOptions } = props
  return (
    <div className="box">
      <p>ProcessCreate</p>
      <form onSubmit={onSubmit}>
        <div>{errors.id ? errors.id : null}</div>

        <TextField
          label="Identificador"
          type="text"
          name="identifier"
          value={updateData.identifier}
          onChange={onChange}
          error={errors.identifier}
        />

        <TextField
          label="Ano"
          type="text"
          name="year"
          value={updateData.year}
          onChange={onChange}
          error={errors.year}
        />

        <SelectField
          label="Curso"
          name="course_id"
          value={updateData.course_id}
          onChange={onChange}
          options={courseOptions}
          error={errors.course_id}
        />

        <TextAreaField
          label="Descrição"
          name="description"
          value={updateData.description}
          onChange={onChange}
          error={errors.description}
        />

        <CheckboxField
          label="Visível"
          name="visible"
          checked={updateData.visible}
          error={errors.visible}
          onChange={onCheck}
        />

        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default ProcessCreate
