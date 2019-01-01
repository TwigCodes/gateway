import { Action } from '@ngrx/store';
import { KeycloakUser, KeycloakGroup } from '../../admin.model';

export enum ActionTypes {
  GetUsersByGroupSuccess = '[GroupApi] Get Users By User Success',
  GetUsersByGroupFail = '[GroupApi] Get Users By User Fail',
  PageChange = '[GroupDetailPage] Page Change',
  NextPage = '[GroupDetailPage] Next Page',
  NextPageSuccess = '[GroupApi] Next Page Success',
  NextPageFail = '[GroupDetailPage] Next Page Fail',
  LoadStart = '[GroupDetailPage] Load Start',
  LoadingComplete = '[GroupDetailPage] Load Complete'
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

export type GroupDetailActions =
  | GetUsersByGroupSuccessAction
  | GetUsersByGroupFailAction
  | PageChangeAction
  | NextPageAction
  | NextPageSuccessAction
  | NextPageFailAction
  | LoadStartAction
  | LoadingCompleteAction;
