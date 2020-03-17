import React from 'react'

import TextField from '../TextField'
import CheckboxField from '../CheckboxField'

const Profile = props => {
  const { updateData, onChange, onCheck } = props
  const errors = {}
  const onSubmit = () => {}

  return (
    <div className="box">
      <p>Atualizar perfil - usuário</p>
      <form onSubmit={onSubmit}>
        <TextField
          label="Login"
          type="text"
          name="login"
          value={updateData.identifier}
          onChange={onChange}
          error={errors.identifier}
        />

        <CheckboxField label="Alterar senha" name="changePw" checked={updateData.changePw} onChange={onCheck} />

        {updateData.changePw ? (
          <React.Fragment>
            <TextField
              label="Senha"
              type="password"
              name="password"
              value={updateData.password}
              onChange={onChange}
              error={errors.password}
            />

            <TextField
              label="Repita a senha"
              type="password"
              name="passwordCheck"
              value={updateData.passwordCheck}
              onChange={onChange}
              error={errors.passwordCheck}
            />
          </React.Fragment>
        ) : null}

        <input type="submit" value="Atualizar" />
      </form>
    </div>
  )
}
export default Profile
