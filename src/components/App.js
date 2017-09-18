import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from './Navbar/Navbar';
import FlashMessagesList from './Flash/FlashMessagesList';
import SignupPage from './SignupPage/SignupPage';
import LoginPage from './Login/LoginPage';

const history = createBrowserHistory();

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Router history={history}>
        <div className="App">
          <Navbar history={history} />
          <FlashMessagesList />
          <Route
            exact
            path="/"
            render={() =>
              isAuthenticated ? <Home /> : <Redirect to="/login" />}
          />
          <Route
            path="/signup"
            render={() =>
              isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <SignupPage history={history} />
              )}
          />
          <Route
            path="/login"
            render={() =>
              isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <LoginPage history={history} />
              )}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
