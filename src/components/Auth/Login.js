import React from 'react'

import TextField from '../TextField'

const ProcessList = props => {
  const { loginData, errors, onChange, onSubmit } = props

  return (
    <div className="box">
      <p>Login</p>
      <form onSubmit={onSubmit}>
        <TextField
          label="Login"
          type="text"
          name="login"
          value={loginData.login}
          onChange={onChange}
          error={errors.login}
        />
        <TextField
          label="Senha"
          type="password"
          name="password"
          value={loginData.password}
          onChange={onChange}
          error={errors.password}
        />
        <input type="submit" />
      </form>
    </div>
  )
}
export default ProcessList
