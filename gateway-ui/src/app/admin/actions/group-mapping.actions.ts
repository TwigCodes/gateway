import { Action } from '@ngrx/store';
import { KeycloakUser, KeycloakGroup } from '../admin.model';

export enum ActionTypes {
  AddUserToGroup = '[GroupDetailPage] Add User To Group',
  AddUserToGroupSuccess = '[UserAPI] Add User To Group Success',
  AddUserToGroupFail = '[UserAPI] Add User To Group Fail',
  DeleteUserFromGroup = '[GroupDetailPage] Delete User from Group',
  DeleteUserFromGroupSuccess = '[UserAPI] Delete User from Group Success',
  DeleteUserFromGroupFail = '[UserAPI] Delete User from Group Fail',
  AddGroupToUser = '[UserDetailPage] Add Group To User',
  AddGroupToUserSuccess = '[UserAPI] Add Group To User Success',
  AddGroupToUserFail = '[UserAPI] Add Group To User Fail',
  DeleteGroupFromUser = '[UserDetailPage] Delete User from Group',
  DeleteGroupFromUserSuccess = '[UserAPI] Delete User from Group Success',
  DeleteGroupFromUserFail = '[UserAPI] Delete User from Group Fail'
}

export class AddUserToGroupAction implements Action {
  readonly type = ActionTypes.AddUserToGroup;
  constructor(public payload: { user: KeycloakUser; group: KeycloakGroup }) {}
}

export class AddUserToGroupSuccessAction implements Action {
  readonly type = ActionTypes.AddUserToGroupSuccess;
  constructor(public payload: KeycloakUser) {}
}

export class AddUserToGroupFailAction implements Action {
  readonly type = ActionTypes.AddUserToGroupFail;
  constructor(public payload: string) {}
}

export class DeleteUserFromGroupAction implements Action {
  readonly type = ActionTypes.DeleteUserFromGroup;
  constructor(public payload: { user: KeycloakUser; group: KeycloakGroup }) {}
}

export class DeleteUserFromGroupSuccessAction implements Action {
  readonly type = ActionTypes.DeleteUserFromGroupSuccess;
  constructor(public payload: string) {}
}

export class DeleteUserFromGroupFailAction implements Action {
  readonly type = ActionTypes.DeleteUserFromGroupFail;
  constructor(public payload: string) {}
}

export class AddGroupToUserAction implements Action {
  readonly type = ActionTypes.AddGroupToUser;
  constructor(public payload: { user: KeycloakUser; group: KeycloakGroup }) {}
}

export class AddGroupToUserSuccessAction implements Action {
  readonly type = ActionTypes.AddGroupToUserSuccess;
  constructor(public payload: KeycloakGroup) {}
}

export class AddGroupToUserFailAction implements Action {
  readonly type = ActionTypes.AddGroupToUserFail;
  constructor(public payload: string) {}
}

export class DeleteGroupFromUserAction implements Action {
  readonly type = ActionTypes.DeleteGroupFromUser;
  constructor(public payload: { user: KeycloakUser; group: KeycloakGroup }) {}
}

export class DeleteGroupFromUserSuccessAction implements Action {
  readonly type = ActionTypes.DeleteGroupFromUserSuccess;
  constructor(public payload: string) {}
}

export class DeleteGroupFromUserFailAction implements Action {
  readonly type = ActionTypes.DeleteGroupFromUserFail;
  constructor(public payload: string) {}
}

export type GroupMappingActions =
  | AddUserToGroupAction
  | AddUserToGroupSuccessAction
  | AddUserToGroupFailAction
  | DeleteUserFromGroupAction
  | DeleteUserFromGroupSuccessAction
  | DeleteUserFromGroupFailAction
  | AddGroupToUserAction
  | AddGroupToUserSuccessAction
  | AddGroupToUserFailAction
  | DeleteGroupFromUserAction
  | DeleteGroupFromUserSuccessAction
  | DeleteGroupFromUserFailAction;
