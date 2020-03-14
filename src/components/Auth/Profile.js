import React from 'react'

import { checkNested } from '../../utils/checkNested'

const Profile = props => {
  const { profile } = props

  return (
    <div className="box">
      <p>Dados de usuário</p>
      <p>{checkNested(profile, 'user') ? profile.user.login : ''}</p>

      <p>Dados pessoais</p>
      <p>Ainda sem dados pessoais.</p>
    </div>
  )
}
export default Profile
