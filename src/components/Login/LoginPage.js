import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { login } from '../../actions/authActions';

const LoginPage = props => {
  const { login, history } = props; // eslint-disable-line no-shadow
  return (
    <div>
      <LoginForm login={login} history={history} />
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(null, { login })(LoginPage);
