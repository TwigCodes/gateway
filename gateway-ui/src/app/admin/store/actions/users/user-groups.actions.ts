import { Action } from '@ngrx/store';
import {
  KeycloakGroupDTO,
  KeycloakUser,
  KeycloakGroup
} from '@app/admin/admin.model';

export enum ActionTypes {
  NextPage = '[UserAPI] Get Next Page of Groups of User',
  LoadSuccess = '[RoleApi] Get Groups By User Success',
  LoadFail = '[RoleApi] Get Groups By User Fail',
  LoadStart = '[UserDetailPage] Load Start',
  LoadingComplete = '[UserDetailPage] Load Complete',
  Add = '[UserDetailPage] Add Group To User',
  AddSuccess = '[UserAPI] Add Group To User Success',
  AddFail = '[UserAPI] Add Group To User Fail',
  Delete = '[UserDetailPage] Delete User from Group',
  DeleteSuccess = '[UserAPI] Delete User from Group Success',
  DeleteFail = '[UserAPI] Delete User from Group Fail'
}

export class NextPageAction implements Action {
  readonly type = ActionTypes.NextPage;
  constructor() {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(public payload: KeycloakGroup[]) {}
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LoadFail;
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

export class AddAction implements Action {
  readonly type = ActionTypes.Add;
  constructor(public payload: { user: KeycloakUser; group: KeycloakGroup }) {}
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.AddSuccess;
  constructor(public payload: KeycloakGroup) {}
}

export class AddFailAction implements Action {
  readonly type = ActionTypes.AddFail;
  constructor(public payload: string) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: { user: KeycloakUser; group: KeycloakGroup }) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(public payload: string) {}
}

export class DeleteFailAction implements Action {
  readonly type = ActionTypes.DeleteFail;
  constructor(public payload: string) {}
}

export type UserGroupsActions =
  | NextPageAction
  | LoadSuccessAction
  | LoadFailAction
  | LoadStartAction
  | LoadingCompleteAction
  | AddAction
  | AddSuccessAction
  | AddFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction;
