import React, { useState } from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../../store/actions/auth'
import TextField from '../../components/TextField'

const Login = props => {
  const initialLoginData = { login: '', password: '' }
  const [loginData, setLoginData] = useState(initialLoginData)
  const errors = {}

  const onChange = e => {
    e.preventDefault()
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    props.loginUser(loginData)
  }

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

//Put store-data on props
const mapStateToProps = state => ({
  authStore: state.authStore
})

//Put actions on props
const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login)
