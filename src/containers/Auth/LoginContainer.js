import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { loginUser } from '../../store/actions/auth'
import { clearErrors } from '../../store/actions/error'
import Login from '../../components/Auth/Login'
import { convertErrorsFormat } from '../../utils/error-helpers'
import { validateLogin, validatePassword, validateBodyLogin } from '../../validation/auth'

const LoginContainer = props => {
  const initialLoginData = { login: '', password: '' }
  const [loginData, setLoginData] = useState(initialLoginData)
  const [errors, setErrors] = useState({})
  const { history, errorStore } = props

  //limpar store errors
  useEffect(() => {
    props.clearErrors()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //se mudar/estiver autenticado.
  const { isAuthenticated } = props.authStore
  const { prevLocation } = props.location
  useEffect(() => {
    if (isAuthenticated) {
      if (prevLocation) {
        history.push(prevLocation.from.pathname)
      } else {
        history.push('/auth/dashboard')
      }
    }
  }, [isAuthenticated, prevLocation, history])

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

  //onchange
  const onChange = e => {
    e.preventDefault()
    let fieldError = null

    switch (e.target.name) {
      case 'login':
        fieldError = validateLogin(e.target.value)
        break
      case 'password':
        fieldError = validatePassword(e.target.value)
        break
      default:
        break
    }

    setLoginData({ ...loginData, [e.target.name]: e.target.value })
    if (fieldError) setErrors({ ...errors, [e.target.name]: fieldError })
    else setErrors(_.omit(errors, e.target.name))
  }

  //submit
  const onSubmit = e => {
    e.preventDefault()

    const submitErrors = validateBodyLogin(loginData)

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      props.loginUser(loginData)
    }
  }

  const allProps = {
    ...props,
    loginData: loginData,
    errors: errors,
    onChange: onChange,
    onSubmit: onSubmit
  }

  return <Login {...allProps} />
}

//Put store-data on props
const mapStateToProps = state => ({
  authStore: state.authStore,
  errorStore: state.errorStore
})

//Put actions on props
const mapActionsToProps = {
  loginUser,
  clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(LoginContainer)
