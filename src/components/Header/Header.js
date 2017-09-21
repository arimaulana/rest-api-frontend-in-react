import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionSearch from 'material-ui/svg-icons/action/search';
import SocialShare from 'material-ui/svg-icons/social/share';
import { logout } from '../../actions/authActions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      userData: {},
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.logout = this.logout.bind(this);
    this.avatarClick = this.avatarClick.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      axios
        .request({
          url: `/users/${this.props.auth.user.sub}`,
          method: 'get',
          baseURL: 'http://localhost:3000/api/v1/',
          timeout: 2000,
          headers: { Authorization: `Bearer ${localStorage.jwtToken}` },
        })
        .then(res => {
          this.setState({ userData: res.data });
        });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.auth.isAuthenticated) {
      axios
        .request({
          url: `/users/${newProps.auth.user.sub}`,
          method: 'get',
          baseURL: 'http://localhost:3000/api/v1/',
          timeout: 2000,
          headers: { Authorization: `Bearer ${localStorage.jwtToken}` },
        })
        .then(res => {
          this.setState({ userData: res.data });
        });
    } else if (!newProps.auth.isAuthenticated) {
      this.setState({ userData: {} });
    }
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

  avatarClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { isAuthenticated } = this.props.auth;

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
      <div className="tab-menu">
        <Tab icon={<ActionSearch />} focusRippleColor />
        <Tab icon={<SocialShare />} />
      </div>
    );

    const appStyles = {
      title: {
        cursor: 'pointer',
        textAlign: 'center',
      },
    };

    return (
      <div className="header-top">
        <AppBar
          title={<span style={appStyles.title}>Go Meds</span>}
          onTitleTouchTap={this.handleTouchTap}
          iconElementLeft={
            isAuthenticated ? (
              <Avatar
                src={this.state.userData.avatar}
                size={36}
                style={{ margin: 5, cursor: 'pointer' }}
                onClick={this.avatarClick}
              />
            ) : (
              <IconButton>
                <NavigationMenu onClick={this.avatarClick} />
              </IconButton>
            )
          }
          iconElementRight={isAuthenticated ? <AuthNav /> : <GuestNav />}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          {isAuthenticated ? (
            <Avatar
              src={this.state.userData.avatar}
              size={72}
              style={{
                margin: 5,
                cursor: 'pointer',
              }}
            />
          ) : (
            <h1>Belum Login</h1>
          )}
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(Header);
