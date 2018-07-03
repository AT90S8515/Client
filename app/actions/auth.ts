import { actionCreator, actionCreatorVoid } from './helpers';

export enum AuthAction {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGOUT = 'LOGOUT',
}

export interface LoginActionPayload {
  username: string;
  password: string;
}

export const login = actionCreator<LoginActionPayload>(AuthAction.LOGIN);
export const loginSuccess = actionCreator<string>(AuthAction.LOGIN_SUCCESS);
export const loginError = actionCreator<string>(AuthAction.LOGIN_ERROR);
export const logout = actionCreatorVoid(AuthAction.LOGOUT);

export default {
  login,
  loginSuccess,
  loginError,
  logout,
};
