import { Action } from '@ngrx/store';
import { KeycloakUser, KeycloakRole } from '../../admin.model';

export enum ActionTypes {
  GetRolesByUserSuccess = '[RoleApi] Get Roles By User Success',
  GetRolesByUserFail = '[RoleApi] Get Roles By User Fail',
  LoadStart = '[UserDetailPage] Load Start',
  LoadingComplete = '[UserDetailPage] Load Complete',
  GetById = '[UserDetailPage] Get By Id'
}

export class GetRolesByUserSuccessAction implements Action {
  readonly type = ActionTypes.GetRolesByUserSuccess;
  constructor(public payload: KeycloakRole[]) {}
}

export class GetRolesByUserFailAction implements Action {
  readonly type = ActionTypes.GetRolesByUserFail;
  constructor(public payload: string) {}
}

export class GetByIdAction implements Action {
  readonly type = ActionTypes.GetById;
  constructor(public payload: KeycloakUser) {}
}

export class LoadStartAction implements Action {
  readonly type = ActionTypes.LoadStart;
  constructor() {}
}

export class LoadingCompleteAction implements Action {
  readonly type = ActionTypes.LoadingComplete;
  constructor() {}
}

export type UserDetailActions =
  | GetRolesByUserSuccessAction
  | GetRolesByUserFailAction
  | GetByIdAction
  | LoadStartAction
  | LoadingCompleteAction;
