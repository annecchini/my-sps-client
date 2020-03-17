import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clearErrors } from '../../store/actions/error'
import { updateProfileUser } from '../../store/actions/auth'
import ProfileUpdateUser from '../../components/Auth/ProfileUpdateUser'
import isEmpty from '../../utils/is-empty'
import { validateLogin, validatePassword, validatePasswordCheck, validateBodyProfileUser } from '../../validation/auth'

const ProfileContainer = props => {
  const { user } = props.profile
  const initialUpdateData = { login: '', changePw: false, password: '', passwordCheck: '' }
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [errors, setErrors] = useState({})

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //Carregar valores no formulário
  useEffect(() => {
    setUpdateData({
      login: user.login ? user.login : '',
      changePw: false,
      password: '',
      passwordCheck: ''
    })
  }, [user])

  const onChange = e => {
    e.preventDefault()
    let errorList = {}
    let newErrors = { ...errors }

    switch (e.target.name) {
      case 'login':
        errorList[e.target.name] = validateLogin(e.target.value)
        break
      case 'password':
        errorList[e.target.name] = validatePassword(e.target.value)
        errorList['passwordCheck'] = validatePasswordCheck(updateData.passwordCheck, e.target.value)
        break
      case 'passwordCheck':
        errorList[e.target.name] = validatePasswordCheck(e.target.value, updateData.password)
        break
      default:
        break
    }

    //remove errors if needed
    const toRemove = Object.keys(errorList).filter(key => typeof errorList[key] === 'undefined')
    if (!isEmpty(toRemove)) newErrors = _.omit(newErrors, toRemove)

    //add errors if needed
    const toAdd = {}
    Object.keys(errorList)
      .filter(key => typeof errorList[key] !== 'undefined')
      .map(key => (toAdd[key] = errorList[key]))
    if (!isEmpty(toAdd)) newErrors = { ...newErrors, ...toAdd }

    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    setErrors(newErrors)
  }

  const onCheck = e => {
    setUpdateData({ ...updateData, [e.target.name]: !updateData[e.target.name] })
  }

  const onSubmit = e => {
    e.preventDefault()
    let newUpdateData = {}

    const submitErrors = validateBodyProfileUser(updateData)

    if (submitErrors) {
      setErrors(submitErrors)
    } else {
      if (updateData.changePw) {
        newUpdateData = _.omit({ ...updateData }, ['changePw', 'passwordCheck'])
      } else {
        newUpdateData = _.omit({ ...updateData }, ['changePw', 'password', 'passwordCheck'])
      }

      props.updateProfileUser(newUpdateData, {
        callbackOk: user => {
          props.history.push(`/auth/profile`)
        }
      })
    }
  }

  const allProps = {
    ...props,
    updateData: updateData,
    errors: errors,
    onChange: onChange,
    onCheck: onCheck,
    onSubmit: onSubmit
  }

  return <ProfileUpdateUser {...allProps} />
}

//Put store-data on props
const mapStateToProps = state => ({
  profile: state.authStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors,
  updateProfileUser
}

export default connect(mapStateToProps, mapActionsToProps)(ProfileContainer)
