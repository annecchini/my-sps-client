'use strict'
const Validator = require('validator')

const validateIdentifier = (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is valid
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

const validateYear = (value, mode, item) => {
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
    return 'Formato inválido. Deve ser um ano no formato AAAA'
  }
}

const validateCourseId = async (value, mode, item) => {
  //value exists and its necessary
  if (typeof value === 'undefined' && mode === 'create') {
    return 'Este campo é necessário.'
  }

  //value is not empty
  if (typeof value !== 'undefined' && (value === null || value === '')) {
    return 'Este campo é requerido.'
  }
}

const validateVisible = (value, mode, item) => {
  //value is booblean
  if (typeof value !== 'undefined') {
    if ((value != true && value != false) || value === '') {
      return 'Formato inválido.'
    }
  }
}

module.exports = { validateIdentifier, validateYear, validateCourseId, validateVisible }
