import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProcessListContainer from './ProcessListContainer'
import ProcessCreateContainer from './ProcessCreateContainer'
import ProcessReadContainer from './ProcessReadContainer'
import ProcessUpdateContainer from './ProcessUpdateContainer'
import ProcessDeleteContainer from './ProcessDeleteContainer'
import PrivateRoute from '../Auth/PrivateRoute'

import NotFound from '../../components/Layout/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`} component={ProcessListContainer} />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/create`}
          component={ProcessCreateContainer}
          permission="process_create"
        />

        <PrivateRoute exact path={`${this.props.match.path}/read/:id`} component={ProcessReadContainer} />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/update/:id`}
          component={ProcessUpdateContainer}
          permission="process_update"
        />

        <PrivateRoute
          exact
          path={`${this.props.match.path}/delete/:id`}
          component={ProcessDeleteContainer}
          permission="process_delete"
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
