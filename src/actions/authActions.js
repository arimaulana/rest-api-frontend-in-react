import axios from 'axios';
import { SET_CURRENT_USER } from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function login(data) {
  return dispatch =>
    axios
      .request({
        url: '/login',
        method: 'post',
        baseURL: 'http://localhost:3000/api/v1/',
        data,
        timeout: 2000
      })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
      });
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
