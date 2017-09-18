import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';

class LoginPage extends React.Component {
  render() {
    const { login, history } = this.props;
    return (
      <div>
        <LoginForm
          login={login}
          history={history}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginPage);
