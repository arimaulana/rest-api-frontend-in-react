import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const styleForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      con_pass: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.userSignupRequest(this.state).then(
      () => {
        setTimeout(
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          }),
          2000
        );
        this.props.history.push('/');
      },
      err => this.setState({ errors: err.response.data, isLoading: false })
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="flex-item" style={styleForm}>
          <h2>Sign Up</h2>
          <TextField
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
            hintText="First Name"
            errorText={errors.first_name}
            floatingLabelText="First Name"
          />
          <TextField
            name="last_name"
            value={this.state.last_name}
            onChange={this.onChange}
            hintText="Last Name"
            errorText={errors.last_name}
            floatingLabelText="Last Name"
          />
          <TextField
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            hintText="Username"
            errorText={errors.username}
            floatingLabelText="Username"
          />
          <TextField
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            hintText="Email"
            errorText={errors.email}
            floatingLabelText="Email"
            type="email"
          />
          <TextField
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            hintText="Password"
            errorText={errors.password}
            floatingLabelText="Password"
            type="password"
          />
          <TextField
            name="con_pass"
            value={this.state.con_pass}
            onChange={this.onChange}
            hintText="Confirm Password"
            errorText={errors.con_pass}
            floatingLabelText="Confirm Password"
            type="password"
          />
          <br />
          <RaisedButton
            disabled={this.state.isLoading}
            label="Sign Up"
            type="sumbit"
            primary
          />
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default SignupForm;
