import { Action } from '@ngrx/store';
import { KeycloakUser, KeycloakGroup } from '@app/libs';

export enum ActionTypes {
  GetUsersByGroupSuccess = '[GroupApi] Get Users By User Success',
  GetUsersByGroupFail = '[GroupApi] Get Users By User Fail',
  PageChange = '[GroupDetailPage] Page Change',
  NextPage = '[GroupDetailPage] Next Page',
  NextPageSuccess = '[GroupApi] Next Page Success',
  NextPageFail = '[GroupDetailPage] Next Page Fail',
  LoadStart = '[GroupDetailPage] Load Start',
  LoadingComplete = '[GroupDetailPage] Load Complete',
  AddUserToGroup = '[GroupDetailPage] Add User To Group',
  AddUserToGroupSuccess = '[UserAPI] Add User To Group Success',
  AddUserToGroupFail = '[UserAPI] Add User To Group Fail',
  DeleteUserFromGroup = '[GroupDetailPage] Delete User from Group',
  DeleteUserFromGroupSuccess = '[UserAPI] Delete User from Group Success',
  DeleteUserFromGroupFail = '[UserAPI] Delete User from Group Fail'
}

export class GetUsersByGroupSuccessAction implements Action {
  readonly type = ActionTypes.GetUsersByGroupSuccess;
  constructor(public payload: KeycloakUser[]) {}
}

export class GetUsersByGroupFailAction implements Action {
  readonly type = ActionTypes.GetUsersByGroupFail;
  constructor(public payload: string) {}
}

export class PageChangeAction implements Action {
  readonly type = ActionTypes.PageChange;
  constructor(public payload: { pageIndex: number; pageSize: number }) {}
}

export class NextPageAction implements Action {
  readonly type = ActionTypes.NextPage;
  constructor() {}
}

export class NextPageSuccessAction implements Action {
  readonly type = ActionTypes.NextPageSuccess;
  constructor(public payload: KeycloakUser[]) {}
}

export class NextPageFailAction implements Action {
  readonly type = ActionTypes.NextPageFail;
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

export type GroupDetailActions =
  | GetUsersByGroupSuccessAction
  | GetUsersByGroupFailAction
  | PageChangeAction
  | NextPageAction
  | NextPageSuccessAction
  | NextPageFailAction
  | LoadStartAction
  | LoadingCompleteAction
  | AddUserToGroupAction
  | AddUserToGroupSuccessAction
  | AddUserToGroupFailAction
  | DeleteUserFromGroupAction
  | DeleteUserFromGroupSuccessAction
  | DeleteUserFromGroupFailAction;
