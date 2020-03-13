import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

import store from '../../store/store'
import { setCurrentUser } from '../../store/actions/auth'
import NavBar from '../Layout/NavBar'
import Footer from '../Layout/Footer'
import Landing from '../Landing/Landing'
import ProcessListContainer from '../Process/ProcessListContainer'
import ProcessCreateContainer from '../Process/ProcessCreateContainer'
import ProcessReadContainer from '../Process/ProcessReadContainer'
import ProcessUpdateContainer from '../Process/ProcessUpdateContainer'
import ProcessDeleteContainer from '../Process/ProcessDeleteContainer'

import Login from '../Auth/Login'
import Dashboard from '../Profile/Dashboard'

import { logoutUser } from '../../store/actions/auth'
import { setSpsApiToken } from '../../utils/api-helpers'

//Check token
if (localStorage.token && typeof localStorage.token !== 'undefined') {
  //decode and load authStore
  const decoded = jwt_decode(localStorage.token)
  store.dispatch(setCurrentUser(decoded))
  setSpsApiToken(localStorage.token)

  //check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />

            <Route exact path="/process" component={ProcessListContainer} />
            <Route exact path="/process/create" component={ProcessCreateContainer} />
            <Route exact path="/process/read/:id" component={ProcessReadContainer} />
            <Route exact path="/process/update/:id" component={ProcessUpdateContainer} />
            <Route exact path="/process/delete/:id" component={ProcessDeleteContainer} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
