import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import SocialGroup from 'material-ui/svg-icons/social/group';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';

const GuestHeaderMenu = () => (
  <Tabs>
    <Tab label="Login" containerElement={<Link to="/login" />} />
    <Tab label="Register" containerElement={<Link to="/signup" />} />
  </Tabs>
);

class UserHeaderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = value => {
    this.setState({ slideIndex: value });
  };

  render() {
    return (
      <div className="header-menu">
        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
          <Tab icon={<CommunicationChat />} value={0} label="Chat" />
          <Tab icon={<ActionTimeline />} value={1} label="Timeline" />
          <Tab icon={<SocialGroup />} value={2} label="Friend" />
          <Tab icon={<SocialGroupAdd />} value={3} label="Community" />
        </Tabs>
      </div>
    );
  }
}

const HeaderMenu = props => {
  const { isAuthenticated } = props.auth;
  if (isAuthenticated) {
    return <UserHeaderMenu />;
  }
  return <GuestHeaderMenu />;
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

HeaderMenu.propTypes = {
  auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps)(HeaderMenu);
