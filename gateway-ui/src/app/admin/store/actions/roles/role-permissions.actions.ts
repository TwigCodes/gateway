import { Action } from '@ngrx/store';
import { Permission, RolePermission } from '@app/libs';

export enum ActionTypes {
  AddPermissionToRole = '[RoleDetailPage] Add Permission To Role',
  AddPermissionToRoleSuccess = '[PermissionAPI] Add Permission To Role Success',
  AddPermissionToRoleFail = '[PermissionAPI] Add Permission To Role Fail',
  DeletePermissionFromRole = '[RoleDetailPage] Delete Permission from Role',
  DeletePermissionFromRoleSuccess = '[PermissionAPI] Delete Permission from Role Success',
  DeletePermissionFromRoleFail = '[PermissionAPI] Delete Permission from Role Fail',
  GetPermissionsByRoleSuccess = '[RoleApi] Get Permissions By Role Success',
  GetPermissionsByRoleFail = '[RoleApi] Get Permissions By Role Fail',
  LoadStart = '[RoleDetailPage] Load Start',
  LoadingComplete = '[RoleDetailPage] Load Complete',
  GetAvailablePermsByRoleSuccess = '[RoleApi] Get Available Permissions Success',
  GetAvailablePermsByRoleFail = '[RoleApi] Get Available Permissions Fail'
}

export class AddPermissionToRoleAction implements Action {
  readonly type = ActionTypes.AddPermissionToRole;
  constructor(public payload: Permission) {}
}

export class AddPermissionToRoleSuccessAction implements Action {
  readonly type = ActionTypes.AddPermissionToRoleSuccess;
  constructor(public payload: RolePermission) {}
}

export class AddPermissionToRoleFailAction implements Action {
  readonly type = ActionTypes.AddPermissionToRoleFail;
  constructor(public payload: string) {}
}

export class DeletePermissionFromRoleAction implements Action {
  readonly type = ActionTypes.DeletePermissionFromRole;
  constructor(public payload: string) {}
}

export class DeletePermissionFromRoleSuccessAction implements Action {
  readonly type = ActionTypes.DeletePermissionFromRoleSuccess;
  constructor(public payload: string) {}
}

export class DeletePermissionFromRoleFailAction implements Action {
  readonly type = ActionTypes.DeletePermissionFromRoleFail;
  constructor(public payload: string) {}
}

export class GetPermissionsByRoleSuccessAction implements Action {
  readonly type = ActionTypes.GetPermissionsByRoleSuccess;
  constructor(public payload: RolePermission[]) {}
}

export class GetPermissionsByRoleFailAction implements Action {
  readonly type = ActionTypes.GetPermissionsByRoleFail;
  constructor(public payload: string) {}
}

export class GetAvailablePermsSuccessAction implements Action {
  readonly type = ActionTypes.GetAvailablePermsByRoleSuccess;
  constructor(public payload: Permission[]) {}
}

export class GetAvailablePermsFailAction implements Action {
  readonly type = ActionTypes.GetAvailablePermsByRoleFail;
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

export type RolePermissionsActions =
  | AddPermissionToRoleAction
  | AddPermissionToRoleSuccessAction
  | AddPermissionToRoleFailAction
  | DeletePermissionFromRoleAction
  | DeletePermissionFromRoleSuccessAction
  | DeletePermissionFromRoleFailAction
  | GetPermissionsByRoleSuccessAction
  | GetPermissionsByRoleFailAction
  | LoadStartAction
  | LoadingCompleteAction
  | GetAvailablePermsSuccessAction
  | GetAvailablePermsFailAction;
