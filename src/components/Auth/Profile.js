import React from 'react'
import { Link } from 'react-router-dom'

import { checkNested } from '../../utils/checkNested'

const Profile = props => {
  const { profile } = props

  return (
    <React.Fragment>
      <div className="box">
        <p>
          <Link to={`/auth/profile/update/user`}>Atualizar dados de usuário</Link>
        </p>
      </div>
      <div className="box">
        <p>Dados de usuário</p>
        <p>{checkNested(profile, 'user') ? profile.user.login : ''}</p>
      </div>
    </React.Fragment>
  )
}
export default Profile
