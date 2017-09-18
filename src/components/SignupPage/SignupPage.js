import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

const SignupPage = props => {
  const { userSignupRequest, addFlashMessage, history } = props; // eslint-disable-line no-shadow
  return (
    <SignupForm
      userSignupRequest={userSignupRequest}
      addFlashMessage={addFlashMessage}
      history={history}
    />
  );
};

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default connect(null, { userSignupRequest, addFlashMessage })(
  SignupPage,
);
