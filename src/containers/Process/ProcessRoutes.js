import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProcessCreateContainer from './ProcessCreateContainer'
import ProcessListContainer from './ProcessListContainer'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`} component={ProcessListContainer} />
        <Route exact path={`${this.props.match.path}/create`} component={ProcessCreateContainer} />
        <Route exact path={`${this.props.match.path}/read/:id`} component={ProcessCreateContainer} />
        <Route exact path={`${this.props.match.path}/update/:id`} component={ProcessCreateContainer} />
        <Route exact path={`${this.props.match.path}/delete/:id`} component={ProcessCreateContainer} />
      </Switch>
    )
  }
}
