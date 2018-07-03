import * as React from 'react';
import Login from '../components/Login';
import { AuthState } from '../reducers/auth';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  login,
  logout,
} from '../actions/auth';
import { IAppState, IDispatchFunc } from '../reducers';

interface IStoreProps {
  authStore: AuthState;
}
interface IStoreActions {
  login: typeof login;
  logout: typeof logout;
}

interface IProps extends IStoreProps, IStoreActions { }

// tslint:disable-next-line:variable-name
const LoginPageContainer: React.SFC<IProps> = (props: IProps) => {
  return (
    <Login
      login={props.login}
      {...props.authStore}
    />
  );
};

export default connect(
  (state: IAppState) => ({
    authStore: state.auth,
  } as IStoreProps),
  // tslint:disable-next-line:variable-name
  (_dispatch: IDispatchFunc<Action>) => ({
    login,
    logout,
  } as IStoreActions),
)(LoginPageContainer);
