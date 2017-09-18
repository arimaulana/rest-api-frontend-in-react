import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { ToolbarGroup } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    const AuthNav = props => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)} />
      </IconMenu>
    );

    AuthNav.muiName = 'IconMenu';

    const GuestNav = () => (
      <ToolbarGroup>
        <FlatButton label="Login" containerElement={<Link to="/" />} />
        <FlatButton label="Register" containerElement={<Link to="/signup" />} />
      </ToolbarGroup>
    );

    const { isAuthenticated } = this.props.auth;
    return (
      <AppBar
        title="Go-Meds"
        iconElementRight={isAuthenticated ? <AuthNav /> : <GuestNav />}
      />
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
