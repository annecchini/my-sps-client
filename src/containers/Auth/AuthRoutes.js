import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginContainer from './LoginContainer'
import DashboardContainer from './DashboardContainer'
import ProfileContainer from './ProfileContainer'
import ProfileUpdateUserContainer from './ProfileUpdateUserContainer'

import NotFound from '../../components/Layout/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/Login`} component={LoginContainer} />
        <Route exact path={`${this.props.match.path}/dashboard`} component={DashboardContainer} />
        <Route exact path={`${this.props.match.path}/profile`} component={ProfileContainer} />
        <Route exact path={`${this.props.match.path}/profile/update/user`} component={ProfileUpdateUserContainer} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
