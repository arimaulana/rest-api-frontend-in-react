import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { ToolbarGroup } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';

class Navbar extends React.Component {
  constructor() {
    super();
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleTouchTap(e) {
    e.preventDefault();
    this.props.history.push('/');
  }

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
        <MenuItem primaryText="Sign out" onClick={this.logout} />
      </IconMenu>
    );

    AuthNav.muiName = 'IconMenu';

    const GuestNav = () => (
      <ToolbarGroup>
        <FlatButton label="Login" containerElement={<Link to="/" />} />
        <FlatButton label="Register" containerElement={<Link to="/signup" />} />
      </ToolbarGroup>
    );

    const appStyles = {
      title: {
        cursor: 'pointer',
      },
    };

    const { isAuthenticated } = this.props.auth;
    return (
      <AppBar
        title={<span style={appStyles.title}>Go Meds</span>}
        onTitleTouchTap={this.handleTouchTap}
        iconElementRight={isAuthenticated ? <AuthNav /> : <GuestNav />}
      />
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
