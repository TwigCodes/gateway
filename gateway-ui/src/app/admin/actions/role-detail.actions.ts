import { Action } from '@ngrx/store';
import { KeycloakUser, KeycloakRole } from '../admin.model';

export enum ActionTypes {
  GetUsersByRoleSuccess = '[RoleApi] Get Users By Role Success',
  GetUsersByRoleFail = '[RoleApi] Get Users By Role Fail',
  PageChange = '[RoleDetailPage] Page Change',
  LoadStart = '[RoleDetailPage] Load Start',
  LoadingComplete = '[RoleDetailPage] Load Complete',
  GetById = '[RoleDetailPage] Get By Id',
  AddUserToRole = '[RoleMappingDialog] Add User To Role',
  AddUserToRoleSuccess = '[UserAPI] Add User To Role Success',
  AddUserToRoleFail = '[UserAPI] Add User To Role Fail',
  DeleteUserFromRole = '[RoleMappingDialog] Delete User from Role',
  DeleteUserFromRoleSuccess = '[UserAPI] Delete User from Role Success',
  DeleteUserFromRoleFail = '[UserAPI] Delete User from Role Fail'
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

export class AddUserToRoleAction implements Action {
  readonly type = ActionTypes.AddUserToRole;
  constructor(public payload: { user: KeycloakUser; role: KeycloakRole }) {}
}

export class AddUserToRoleSuccessAction implements Action {
  readonly type = ActionTypes.AddUserToRoleSuccess;
  constructor(public payload: KeycloakUser) {}
}

export class AddUserToRoleFailAction implements Action {
  readonly type = ActionTypes.AddUserToRoleFail;
  constructor(public payload: string) {}
}

export class DeleteUserFromRoleAction implements Action {
  readonly type = ActionTypes.DeleteUserFromRole;
  constructor(public payload: { user: KeycloakUser; role: KeycloakRole }) {}
}

export class DeleteUserFromRoleSuccessAction implements Action {
  readonly type = ActionTypes.DeleteUserFromRoleSuccess;
  constructor(public payload: string) {}
}

export class DeleteUserFromRoleFailAction implements Action {
  readonly type = ActionTypes.DeleteUserFromRoleFail;
  constructor(public payload: string) {}
}

export type RoleDetailActions =
  | GetUsersByRoleSuccessAction
  | GetUsersByRoleFailAction
  | PageChangeAction
  | LoadStartAction
  | LoadingCompleteAction
  | GetByIdAction
  | AddUserToRoleAction
  | AddUserToRoleSuccessAction
  | AddUserToRoleFailAction
  | DeleteUserFromRoleAction
  | DeleteUserFromRoleSuccessAction
  | DeleteUserFromRoleFailAction;
