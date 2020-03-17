import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { clearErrors } from '../../store/actions/error'
import Profile from '../../components/Auth/Profile'

const ProfileContainer = props => {
  //componentDidMount
  useEffect(() => {
    props.clearErrors()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const allProps = {
    ...props
  }

  return <Profile {...allProps} />
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
