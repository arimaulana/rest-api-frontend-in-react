import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => axios.post('http://localhost:3000/api/v1/users', userData);
}
