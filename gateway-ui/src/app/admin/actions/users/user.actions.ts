import { Action } from '@ngrx/store';
import { KeycloakUser } from '../../admin.model';

export enum ActionTypes {
  Add = '[UserPage] Add',
  AddSuccess = '[UserApi] Add Success',
  AddFail = '[UserApi] Add Fail',
  Delete = '[UserPage] Delete',
  DeleteSuccess = '[UserApi] Delete Success',
  DeleteFail = '[UserApi] Delete Fail',
  Update = '[UserPage] Update',
  UpdateSuccess = '[UserApi] Update Success',
  UpdateFail = '[UserApi] Update Fail',
  LoadPage = '[UserPage] LoadPage',
  LoadPageSuccess = '[UserApi] LoadPage Success',
  LoadPageFail = '[UserApi] LoadPage Fail',
  Count = '[UserPage] Count',
  CountSuccess = '[UserApi] Count Success',
  CountFail = '[UserApi] Count Fail'
}

export class AddAction implements Action {
  readonly type = ActionTypes.Add;
  constructor(public payload: Partial<KeycloakUser>) {}
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.AddSuccess;
  constructor(public payload: KeycloakUser) {}
}

export class AddFailAction implements Action {
  readonly type = ActionTypes.AddFail;
  constructor(public payload: string) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: string) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(public payload: string) {}
}

export class DeleteFailAction implements Action {
  readonly type = ActionTypes.DeleteFail;
  constructor(public payload: string) {}
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.Update;
  constructor(public payload: { id: string; update: KeycloakUser }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UpdateSuccess;
  constructor(public payload: KeycloakUser) {}
}

export class UpdateFailAction implements Action {
  readonly type = ActionTypes.UpdateFail;
  constructor(public payload: string) {}
}

export class LoadPageAction implements Action {
  readonly type = ActionTypes.LoadPage;
  constructor(public payload: { pageIndex: number; pageSize: number }) {}
}

export class LoadPageSuccessAction implements Action {
  readonly type = ActionTypes.LoadPageSuccess;
  constructor(public payload: KeycloakUser[]) {}
}

export class LoadPageFailAction implements Action {
  readonly type = ActionTypes.LoadPageFail;
  constructor(public payload: string) {}
}

export class CountAction implements Action {
  readonly type = ActionTypes.Count;
  constructor() {}
}

export class CountSuccessAction implements Action {
  readonly type = ActionTypes.CountSuccess;
  constructor(public payload: number) {}
}

export class CountFailAction implements Action {
  readonly type = ActionTypes.CountFail;
  constructor(public payload: string) {}
}

export type UserActions =
  | AddAction
  | AddSuccessAction
  | AddFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | LoadPageAction
  | LoadPageSuccessAction
  | LoadPageFailAction
  | CountAction
  | CountSuccessAction
  | CountFailAction;
