import { Action } from '@ngrx/store';
import { KeycloakUser, KeycloakRole } from '../admin.model';

export enum ActionTypes {
  GetUsersByRoleSuccess = '[RoleApi] Get Users By Role Success',
  GetUsersByRoleFail = '[RoleApi] Get Users By Role Fail',
  PageChange = '[RoleDetailPage] Page Change',
  LoadStart = '[RoleDetailPage] Load Start',
  LoadingComplete = '[RoleDetailPage] Load Complete',
  GetById = '[RoleDetailPage] Get By Id'
}

export class GetUsersByRoleSuccessAction implements Action {
  readonly type = ActionTypes.GetUsersByRoleSuccess;
  constructor(public payload: KeycloakUser[]) {}
}

export class GetUsersByRoleFailAction implements Action {
  readonly type = ActionTypes.GetUsersByRoleFail;
  constructor(public payload: string) {}
}

export class PageChangeAction implements Action {
  readonly type = ActionTypes.PageChange;
  constructor(public payload: { pageIndex: number; pageSize: number }) {}
}

export class LoadStartAction implements Action {
  readonly type = ActionTypes.LoadStart;
  constructor() {}
}

export class LoadingCompleteAction implements Action {
  readonly type = ActionTypes.LoadingComplete;
  constructor() {}
}

export class GetByIdAction implements Action {
  readonly type = ActionTypes.GetById;
  constructor(public payload: KeycloakRole) {}
}

export type RoleDetailActions =
  | GetUsersByRoleSuccessAction
  | GetUsersByRoleFailAction
  | PageChangeAction
  | LoadStartAction
  | LoadingCompleteAction
  | GetByIdAction;
