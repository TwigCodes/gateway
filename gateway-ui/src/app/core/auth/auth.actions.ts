import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  CHECK_LOGIN = '[AUTH] Check Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Failed'
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class ActionAuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
}

export class ActionAuthLoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionAuthCheckLogin implements Action {
  readonly type = AuthActionTypes.CHECK_LOGIN;
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthLoginSuccess
  | ActionAuthLoginFail
  | ActionAuthLogout
  | ActionAuthCheckLogin;
