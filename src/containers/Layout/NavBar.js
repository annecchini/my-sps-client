import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../store/actions/auth'

const NavBar = props => {
  const { isAuthenticated } = props.authStore

  const guestLinks = () => {
    return (
      <ul>
        <li>
          <Link to={'/auth/login'}>Login</Link>
        </li>
      </ul>
    )
  }

  const authLinks = () => {
    return (
      <ul>
        <li>
          <Link to={'/auth/dashboard'}>Dashboard</Link>
        </li>
        <li>
          <button onClick={() => props.logoutUser()}>Logout</button>
        </li>
      </ul>
    )
  }

  return (
    <div className="box">
      <p>NavBar</p>

      <ul>
        <li>
          <Link to={'/process'}>Processos</Link>
        </li>
      </ul>

      {isAuthenticated ? authLinks() : guestLinks()}
    </div>
  )
}

//Put store-data on props
const mapStateToProps = state => ({
  authStore: state.authStore
})

//Put actions on props
const mapActionsToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(NavBar)
