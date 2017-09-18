import findIndex from 'lodash/findIndex';
import shortid from 'shortid';
import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
} from '../actions/actionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text,
        },
      ];
    /* eslint-disable */
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    /* eslint-enable */

    default:
      return state;
  }
};
