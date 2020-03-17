import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProcessListContainer from './ProcessListContainer'
import ProcessCreateContainer from './ProcessCreateContainer'
import ProcessReadContainer from './ProcessReadContainer'
import ProcessUpdateContainer from './ProcessUpdateContainer'
import ProcessDeleteContainer from './ProcessDeleteContainer'

import NotFound from '../../components/Layout/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`} component={ProcessListContainer} />
        <Route exact path={`${this.props.match.path}/create`} component={ProcessCreateContainer} />
        <Route exact path={`${this.props.match.path}/read/:id`} component={ProcessReadContainer} />
        <Route exact path={`${this.props.match.path}/update/:id`} component={ProcessUpdateContainer} />
        <Route exact path={`${this.props.match.path}/delete/:id`} component={ProcessDeleteContainer} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}
