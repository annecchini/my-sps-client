import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

import store from '../../store/store'
import { logoutUser } from '../../store/actions/auth'
import { setCurrentUser, readProfile } from '../../store/actions/auth'
import NavBarContainer from '../Layout/NavBarContainer'
import Landing from '../Landing/Landing'
import ProcessRoutes from '../Process/ProcessRoutes'
import AuthRoutes from '../Auth/AuthRoutes'
import Footer from '../../components/Layout/Footer'
import NotFound from '../../components/Layout/NotFound'
import { setSpsApiToken } from '../../utils/api-helpers'
import ProcessAssignmentRoutes from '../ProcessAssignment/ProcessAssignmentRoutes'
import { clearErrors } from '../../store/actions/error'

import Main from '../../containers/teste01/Main'

//Check token
if (localStorage.token && typeof localStorage.token !== 'undefined') {
  //decode and load authStore
  const decoded = jwt_decode(localStorage.token)

  store.dispatch(setCurrentUser(decoded))
  setSpsApiToken(localStorage.token)
  store.dispatch(
    readProfile({
      callbackFail: () => store.dispatch(clearErrors()),
    })
  )

  //check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
  }
}

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route component={NavBarContainer} />
          <Switch>
            <Route exact path="/" component={Landing} />

            <Route path="/auth" component={AuthRoutes} />

            <Route path="/process" component={ProcessRoutes} />
            <Route path="/process-assignment" component={ProcessAssignmentRoutes} />

            <Route path="/teste/by-proc/:process_id" component={Main} />

            <Route component={NotFound} />
          </Switch>

          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
