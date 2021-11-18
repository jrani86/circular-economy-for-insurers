import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/Login/LoginForm';
import ClaimList from './pages/ClaimList';
import ClaimDetail from './pages/ClaimDetails';
import RepairFacility from './pages/RepairFacility';

import ConfirmationPage from './pages/ConfirmationPage';
import Header from './components/Header';
import LocalStorage from './storage/LocalStorage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const localStore = new LocalStorage();
const hasLoggedIn = localStore.getValueFromLocalStorage("loggedIn");

class App extends Component {
  render() {
    
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/login" />
            )} />
            <Route exact path='/login' component={LoginForm} />
            <Route path='/claim' component={ClaimList} />
            <Route path='/claimdetails' component={ClaimDetail} />
            <Route path='/repairFacility' component={RepairFacility} />
            <Route path='/confirmation' component={ConfirmationPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
