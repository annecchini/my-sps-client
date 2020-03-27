import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProcAssigCrudByProcContainer from './ProcAssigCrudByProcContainer'
import NotFound from '../../components/Layout/NotFound'

export default class ProcessRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}/by-process/:process_id`}
          component={ProcAssigCrudByProcContainer}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
