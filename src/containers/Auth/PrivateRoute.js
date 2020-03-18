import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { checkAccess } from '../../utils/permission-system-helpers'
import NotAllowed from '../../components/Layout/NotAllowed'

const PrivateRoute = props => {
  const { component, authStore, permission, course_id, ...rest } = props
  const { isAuthenticated, access } = authStore
  const Component = component

  return (
    <Route
      {...rest}
      render={props => {
        //Logado.
        if (isAuthenticated === true) {
          //Não exigi nenhuma permissão
          if (!permission) return <Component {...props} />

          //Testando permissão
          const accessOk = checkAccess({ access, permission, course_id })
          if (accessOk) return <Component {...props} />
          else return <NotAllowed />
        }

        //Não logado.
        return <Redirect to={{ pathname: '/auth/login', prevLocation: { from: props.location } }} />
      }}
    />
  )
}

const mapStateToProps = state => ({
  authStore: state.authStore
})

const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(PrivateRoute)
