import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../../store/actions/auth'

const Login = props => {
  const initialLoginForm = { login: '', password: '' }
  const [loginForm, setLoginForm] = useState(initialLoginForm)

  //Limpar errors
  useEffect(() => {}, [])

  const onChange = e => {
    e.preventDefault()
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    props.loginUser(loginForm)
  }

  return (
    <div className="box">
      <p>Login</p>
      <form onSubmit={onSubmit}>
        <input type="text" name="login" value={loginForm.login} onChange={onChange} />
        <input type="password" name="password" value={loginForm.password} onChange={onChange} />
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
