import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';

const FlashMessagesList = props => {
  const messages = props.messages.map(message => (
    <FlashMessage
      key={message.id}
      message={message}
      deleteFlashMessage={props.deleteFlashMessage}
    />
  ));
  return <div>{messages}</div>;
};

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired, // eslint-disable-line
  deleteFlashMessage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
  };
}

export default connect(mapStateToProps, { deleteFlashMessage })(
  FlashMessagesList,
);
