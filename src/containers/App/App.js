import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store/store'

import NavBar from '../Layout/NavBar'
import Footer from '../Layout/Footer'
import Landing from '../Landing/Landing'
import ProcessList from '../Process/ProcessList'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/process" component={ProcessList} />
            <Route exact path="/login" component={() => 'login'} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
