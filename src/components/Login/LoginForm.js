import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

const styleForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.login(this.state).then(() => {
      this.props.history.push('/');
    });

    // .catch(err => {
    //   console.log(err);
    //   if (err.response) {
    //     console.log(err.response);
    //   } else if (err.request) {
    //     console.log(err.request);
    //   } else {
    //     console.log(err.message);
    //   }
    // });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, username, password, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="flex-item" style={styleForm}>
          <h2>Login</h2>
          <TextField
            name="username"
            value={username}
            onChange={this.onChange}
            hintText="Username"
            errorText={errors.username}
            floatingLabelText="Username"
          />
          <TextField
            name="password"
            value={password}
            onChange={this.onChange}
            hintText="Password"
            errorText={errors.password}
            floatingLabelText="Password"
            type="password"
          />
          <br />
          {errors.error}
          <RaisedButton
            disabled={isLoading}
            label="Login"
            type="sumbit"
            primary
          />
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default LoginForm;
