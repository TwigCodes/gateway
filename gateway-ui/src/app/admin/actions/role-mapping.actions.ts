import { Action } from '@ngrx/store';
import { KeycloakUser, KeycloakRole } from '../admin.model';

export enum ActionTypes {
  AddUserToRole = '[RoleDetailPage] Add User To Role',
  AddUserToRoleSuccess = '[UserAPI] Add User To Role Success',
  AddUserToRoleFail = '[UserAPI] Add User To Role Fail',
  DeleteUserFromRole = '[RoleDetailPage] Delete User from Role',
  DeleteUserFromRoleSuccess = '[UserAPI] Delete User from Role Success',
  DeleteUserFromRoleFail = '[UserAPI] Delete User from Role Fail',
  AddRoleToUser = '[UserDetailPage] Add Role To User',
  AddRoleToUserSuccess = '[UserAPI] Add Role To User Success',
  AddRoleToUserFail = '[UserAPI] Add Role To User Fail',
  DeleteRoleFromUser = '[UserDetailPage] Delete User from Role',
  DeleteRoleFromUserSuccess = '[UserAPI] Delete User from Role Success',
  DeleteRoleFromUserFail = '[UserAPI] Delete User from Role Fail'
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

export type RoleMappingActions =
  | AddUserToRoleAction
  | AddUserToRoleSuccessAction
  | AddUserToRoleFailAction
  | DeleteUserFromRoleAction
  | DeleteUserFromRoleSuccessAction
  | DeleteUserFromRoleFailAction
  | AddRoleToUserAction
  | AddRoleToUserSuccessAction
  | AddRoleToUserFailAction
  | DeleteRoleFromUserAction
  | DeleteRoleFromUserSuccessAction
  | DeleteRoleFromUserFailAction;
