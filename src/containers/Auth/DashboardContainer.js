import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = props => {
  return (
    <div className="box">
      <p>Dashboard</p>
      <Link to={'/auth/profile'}>Meu perfil</Link>
    </div>
  )
}

export default Dashboard
