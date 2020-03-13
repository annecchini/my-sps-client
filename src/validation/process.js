import Validator from 'validator'

import isEmpty from '../utils/is-empty'

export const validateIdentifier = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

export const validateYear = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }

  //value is a year
  if (typeof value !== 'undefined' && !Validator.matches(value, /^\d{4}$/)) {
    return 'Formato inválido. Deve ser um ano no formato AAAA.'
  }
}

export const validateCourseId = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

export const validateVisible = (value, mode, item) => {
  //value is booblean
  if (typeof value !== 'undefined') {
    if ((value !== true && value !== false) || value === '') {
      return 'Formato inválido.'
    }
  }
}

export const validateDescription = (value, mode, item) => {
  //value is not null
  if (typeof value !== 'undefined' && value === null) {
    return 'Este campo não pode ser nulo.'
  }
}

export const validateBody = (body, mode, item) => {
  let errors = {}

  const identifierError = validateIdentifier(body.identifier, mode, item)
  if (identifierError) errors.identifier = identifierError

  const yearError = validateYear(body.year, mode, item)
  if (yearError) errors.year = yearError

  const courseIdError = validateCourseId(body.course_id, mode, item)
  if (courseIdError) errors.course_id = courseIdError

  const visibleError = validateVisible(body.visible, mode, item)
  if (visibleError) errors.visible = visibleError

  const descriptionError = validateDescription(body.description, mode, item)
  if (descriptionError) errors.description = descriptionError

  return !isEmpty(errors) ? errors : null
}
