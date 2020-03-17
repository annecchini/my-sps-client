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

export const validatePasswordCheck = (value, password) => {
  //value exists and its necessary
  if (typeof value === 'undefined') {
    return 'Este campo é necessário.'
  }

  //value is equal to password
  if (value !== password) {
    return 'Deve ser igual ao password.'
  }
}

export const validateBodyLogin = body => {
  let errors = {}

  const loginError = validateLogin(body.login)
  if (loginError) errors.login = loginError

  const passwordError = validatePassword(body.password)
  if (passwordError) errors.password = passwordError

  return !isEmpty(errors) ? errors : null
}

export const validateBodyProfileUser = body => {
  let errors = {}

  const loginError = validateLogin(body.login)
  if (loginError) errors.login = loginError

  if (body.changePw) {
    const passwordError = validatePassword(body.password)
    if (passwordError) errors.password = passwordError

    const passwordCheckError = validatePasswordCheck(body.passwordCheck, body.password)
    if (passwordCheckError) errors.passwordCheck = passwordCheckError
  }

  return !isEmpty(errors) ? errors : null
}
