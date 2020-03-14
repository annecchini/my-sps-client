import isEmpty from '../utils/is-empty'

export const validateLogin = value => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

export const validatePassword = value => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

export const validateBody = body => {
  let errors = {}

  const loginError = validateLogin(body.login)
  if (loginError) errors.login = loginError

  const passwordError = validatePassword(body.password)
  if (passwordError) errors.password = passwordError

  return !isEmpty(errors) ? errors : null
}
