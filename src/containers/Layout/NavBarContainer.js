import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../store/actions/auth'

import NavBar from '../../components/Layout/NavBar'

const NavBarContainer = props => {
  const allProps = {
    ...props
  }

  return <NavBar {...allProps} />
}

//Put store-data on props
const mapStateToProps = state => ({
  authStore: state.authStore
})

//Put actions on props
const mapActionsToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(NavBarContainer)
