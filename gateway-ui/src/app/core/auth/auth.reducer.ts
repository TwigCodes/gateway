import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';
import * as fromRouter from '@ngrx/router-store';

export const initialState: AuthState = {
  isAuthenticated: false,
  realm: null
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions | fromRouter.RouterNavigationAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };
    case fromRouter.ROUTER_NAVIGATION:
      const stateUrl = action.payload.routerState as any;
      return { ...state, realm: stateUrl.params.realm };
    default:
      return state;
  }
}
