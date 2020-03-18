import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginContainer from './LoginContainer'
import DashboardContainer from './DashboardContainer'
import ProfileContainer from './ProfileContainer'
import ProfileUpdateUserContainer from './ProfileUpdateUserContainer'
import PrivateRoute from './PrivateRoute'

import NotFound from '../../components/Layout/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/Login`} component={LoginContainer} />
        <PrivateRoute exact path={`${this.props.match.path}/dashboard`} component={DashboardContainer} />
        <PrivateRoute exact path={`${this.props.match.path}/profile`} component={ProfileContainer} />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/profile/update/user`}
          component={ProfileUpdateUserContainer}
        />

        <PrivateRoute component={NotFound} />
      </Switch>
    )
  }
}
