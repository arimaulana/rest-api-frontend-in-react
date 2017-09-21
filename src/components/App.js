import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import HeaderMenu from './HeaderMenu';
import FlashMessagesList from './Flash';
import SignupPage from './SignupPage';
import LoginPage from './Login';

const history = createBrowserHistory();

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const App = props => {
  const { isAuthenticated } = props.auth;
  return (
    <Router history={history}>
      <div className="App">
        <Header history={history} />
        <HeaderMenu history={history}/>
        <FlashMessagesList />
        <Route
          exact
          path="/"
          render={() => (isAuthenticated ? <Home /> : <Redirect to="/login" />)}
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
};

App.propTypes = {
  auth: PropTypes.object.isRequired, // eslint-disable-line
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
