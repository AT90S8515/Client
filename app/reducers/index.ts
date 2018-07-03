import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth, { AuthState } from './auth';

const rootReducer = combineReducers({
  auth,
  routing: routing as Reducer<any>,
});

export interface IAppState {
  auth: AuthState;
}

export interface IDispatchFunc<TAction> {
  (action: TAction): void;
}

export interface IActionCreatorFunc<TAction> {
  (dispatch: IDispatchFunc<TAction>): () => any;
}

export default rootReducer;
