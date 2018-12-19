import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}
