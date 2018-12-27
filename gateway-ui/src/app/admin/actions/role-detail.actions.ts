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

export class PageChange implements Action {
  readonly type = ActionTypes.PageChange;
  constructor(public payload: { pageIndex: number; pageSize: number }) {}
}

export class LoadStart implements Action {
  readonly type = ActionTypes.LoadStart;
  constructor() {}
}

export class LoadingComplete implements Action {
  readonly type = ActionTypes.LoadingComplete;
  constructor() {}
}

export class GetById implements Action {
  readonly type = ActionTypes.GetById;
  constructor(public payload: KeycloakRole) {}
}

export type RoleDetailActions =
  | GetUsersByRoleSuccessAction
  | GetUsersByRoleFailAction
  | PageChange
  | LoadStart
  | LoadingComplete
  | GetById;
