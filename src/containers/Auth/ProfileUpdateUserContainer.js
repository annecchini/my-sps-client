import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clearErrors } from '../../store/actions/error'
import ProfileUpdateUser from '../../components/Auth/ProfileUpdateUser'
import isEmpty from '../../utils/is-empty'

const ProfileContainer = props => {
  const initialUpdateData = { login: '', changePw: false, password: '', passwordCheck: '' }
  const [updateData, setUpdateData] = useState(initialUpdateData)
  const [errors, setErrors] = useState({})

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = e => {
    e.preventDefault()
    let fieldErrors = []
    let newErrors = {}

    const validateLogin = () => {}
    const validatePassword = () => {}
    const validatePasswordCheck = () => {}

    switch (e.target.name) {
      case 'login':
        newErrors[e.target.name] = validateLogin(e.target.value)
        fieldErrors.push({ name: e.target.name, error: validateLogin(e.target.value) })
        break
      case 'password':
        newErrors[e.target.name] = validatePassword(e.target.value)
        newErrors['passwordCheck'] = validatePasswordCheck(e.target.value, updateData.password)

        fieldErrors.push({ name: e.target.name, error: validatePassword(e.target.value) })
        fieldErrors.push({ name: 'passwordCheck', error: validatePasswordCheck(e.target.value, updateData.password) })
        break
      case 'passwordCheck':
        newErrors['passwordCheck'] = validatePasswordCheck(e.target.value, updateData.password)
        fieldErrors.push({ name: e.target.name, error: validatePasswordCheck(e.target.value, updateData.password) })
        break
      default:
        break
    }

    //set value
    setUpdateData({ ...updateData, [e.target.name]: e.target.value })

    //remove errors if needed
    let toRemove = fieldErrors.filter(fe => typeof fe.error === 'undefined').map(fe => fe.name)
    if (!isEmpty(toRemove)) setErrors(_.omit(errors, toRemove))

    //add errors if needed
    let toAdd = {}
    fieldErrors.filter(fe => typeof fe.error !== 'undefined').map(fe => (toAdd[fe.name] = fe.error))
    if (!isEmpty(toAdd)) setErrors({ ...errors, ...toAdd })
  }

  const onCheck = e => {
    setUpdateData({ ...updateData, [e.target.name]: !updateData[e.target.name] })
  }

  const allProps = {
    ...props,
    updateData: updateData,
    onchange: onChange,
    onCheck: onCheck
  }

  return <ProfileUpdateUser {...allProps} />
}

//Put store-data on props
const mapStateToProps = state => ({
  profile: state.authStore
})

//Put actions on props
const mapActionsToProps = {
  clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(ProfileContainer)
