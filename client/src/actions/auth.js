import axios from 'axios';
import jwt from 'jwt-decode';
import * as actionTypes from './actionsTypes';
import instance from '../utils/instance';

export const userSignup = user => ({
  type: actionTypes.USER_SIGN_UP,
  payload: user,
}); 
export const userLoggedIn = user => ({
  type: actionTypes.USER_LOGGED_IN,
  payload: user,
});
export const setUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user,
});
export const userError = error => ({
  type: actionTypes.USER_ERROR,
  error,
});

export const connectin = loading => ({
  type: actionTypes.LOADING,
});
export const signup = (credentials, history) => (dispatch) => {
  console.log({
    credentials,
  });
  dispatch(connectin(true));
  instance.post('auth/signup', credentials)
    .then((res) => {
      const { data } = res;
      dispatch(userSignup(data));
      history.push('/login');
    })
    .catch((error) => {
      if (error.response) {
        console.log({
          err: 'error in signup',
          error: error.response,
        });
        const myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
        dispatch(userError(myError));
      } else {
        const myError = 'poor internet connection';
        dispatch(userError(myError));
      }
    });
};
export const logIn = (credentials, history) => (dispatch) => {
  // console.log({
  //   credentials,
  // });
  dispatch(connectin(true));

  return instance.post('auth/login', credentials)
    .then((res) => {
      console.log({
        res,
      });
      const { token } = res.data;
      // set key to token
      localStorage.setItem('myUserT', token);

      // setAuthorizationToken(token);

      const userDecode = jwt(token);
      const pass = { ...userDecode, token };
      dispatch(userLoggedIn(pass));
      const navigate = userDecode.role === 'admin' ? '/dashboard' : '/';
      history.push(navigate);
    })
    .catch((error) => {
      if (error.response) {
        console.log({
          err: 'error in login',
          error: error.response,
        });
        const myError = (error.response.data.errorMessage) ? error.response.data.errorMessage[0] : error.response.data.message;
        dispatch(userError(myError));
      } else {
        const myError = 'poor internet connection';
        dispatch(userError(myError));
      }
    });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch(userLoggedIn({}));
};