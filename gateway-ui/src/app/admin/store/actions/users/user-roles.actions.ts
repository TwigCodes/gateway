import { Action } from '@ngrx/store';
import { KeycloakRole, KeycloakUser } from '@app/libs';

export enum ActionTypes {
  AddRoleToUser = '[UserDetailPage] Add Role To User',
  AddRoleToUserSuccess = '[UserAPI] Add Role To User Success',
  AddRoleToUserFail = '[UserAPI] Add Role To User Fail',
  DeleteRoleFromUser = '[UserDetailPage] Delete User from Role',
  DeleteRoleFromUserSuccess = '[UserAPI] Delete User from Role Success',
  DeleteRoleFromUserFail = '[UserAPI] Delete User from Role Fail',
  GetRolesByUserSuccess = '[RoleApi] Get Roles By User Success',
  GetRolesByUserFail = '[RoleApi] Get Roles By User Fail',
  LoadStart = '[UserDetailPage] Load Start',
  LoadingComplete = '[UserDetailPage] Load Complete'
}

export class GetRolesByUserSuccessAction implements Action {
  readonly type = ActionTypes.GetRolesByUserSuccess;
  constructor(public payload: KeycloakRole[]) {}
}

export class GetRolesByUserFailAction implements Action {
  readonly type = ActionTypes.GetRolesByUserFail;
  constructor(public payload: string) {}
}

export class LoadStartAction implements Action {
  readonly type = ActionTypes.LoadStart;
  constructor() {}
}

export class LoadingCompleteAction implements Action {
  readonly type = ActionTypes.LoadingComplete;
  constructor() {}
}

export class AddRoleToUserAction implements Action {
  readonly type = ActionTypes.AddRoleToUser;
  constructor(public payload: { user: KeycloakUser; role: KeycloakRole }) {}
}

export class AddRoleToUserSuccessAction implements Action {
  readonly type = ActionTypes.AddRoleToUserSuccess;
  constructor(public payload: KeycloakRole) {}
}

export class AddRoleToUserFailAction implements Action {
  readonly type = ActionTypes.AddRoleToUserFail;
  constructor(public payload: string) {}
}

export class DeleteRoleFromUserAction implements Action {
  readonly type = ActionTypes.DeleteRoleFromUser;
  constructor(public payload: { user: KeycloakUser; role: KeycloakRole }) {}
}

export class DeleteRoleFromUserSuccessAction implements Action {
  readonly type = ActionTypes.DeleteRoleFromUserSuccess;
  constructor(public payload: string) {}
}

export class DeleteRoleFromUserFailAction implements Action {
  readonly type = ActionTypes.DeleteRoleFromUserFail;
  constructor(public payload: string) {}
}

export type UserRolesActions =
  | GetRolesByUserSuccessAction
  | GetRolesByUserFailAction
  | LoadStartAction
  | LoadingCompleteAction
  | AddRoleToUserAction
  | AddRoleToUserSuccessAction
  | AddRoleToUserFailAction
  | DeleteRoleFromUserAction
  | DeleteRoleFromUserSuccessAction
  | DeleteRoleFromUserFailAction;
