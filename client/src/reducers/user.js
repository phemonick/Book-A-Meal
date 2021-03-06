import isEmpty from 'lodash/isEmpty';
import * as actionsTypes from '../actions/actionsTypes';
import { userState } from './initState';

/**
 * Authentication reducer
 * @function user
 * @param {object} state - reducer state
 * @param {object} action
 */

const user = (state = userState, action) => {
  switch (action.type) {
    case actionsTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.USER_SIGN_UP:
      return {
        ...state,
        loading: false,
        signedUp: true,
        signUpError: false,
        error: null,
      };
    case actionsTypes.USER_LOGGED_IN:
      return {
        ...state,
        loginSuccess: true,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        loginError: null,
        loading: false,
      };
    case actionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        success: !isEmpty(action.payload),
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case actionsTypes.USER_SIGNUP_ERROR:
      return {
        ...state,
        signUpError: true,
        signedUp: false,
        error: action.error,
        loading: false,
      };
    case actionsTypes.LOGIN_ERROR:
      return {
        ...state,
        loginSuccess: false,
        loginError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
