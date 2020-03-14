import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'

const ProfileContainer = props => {
  const { profile } = props

  //componentDidMount
  useEffect(() => {
    props.clearErrors()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //   const allProps = {
  //     ...props
  //   }

  return (
    <div className="box">
      <p>Dados de usuário</p>
      <p>{profile ? profile.user.login : ''}</p>

      <p>Dados pessoais</p>
      <p>Ainda sem dados pessoais.</p>
    </div>
  )
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
