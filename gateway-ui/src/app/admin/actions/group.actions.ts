import { Action } from '@ngrx/store';
import { KeycloakGroup } from '../admin.model';

export enum ActionTypes {
  Add = '[GroupPage] Add',
  AddSuccess = '[GroupApi] Add Success',
  AddFail = '[GroupApi] Add Fail',
  Delete = '[GroupPage] Delete',
  DeleteSuccess = '[GroupApi] Delete Success',
  DeleteFail = '[GroupApi] Delete Fail',
  Update = '[GroupPage] Update',
  UpdateSuccess = '[GroupApi] Update Success',
  UpdateFail = '[GroupApi] Update Fail',
  LoadPage = '[GroupPage] LoadPage',
  LoadPageSuccess = '[GroupApi] LoadPage Success',
  LoadPageFail = '[GroupApi] LoadPage Fail',
  Count = '[GroupPage] Count',
  CountSuccess = '[GroupApi] Count Success',
  CountFail = '[GroupApi] Count Fail'
}

export class AddAction implements Action {
  readonly type = ActionTypes.Add;
  constructor(public payload: Partial<KeycloakGroup>) {}
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
  constructor(public payload: { id: string; update: KeycloakGroup }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UpdateSuccess;
  constructor(public payload: KeycloakGroup) {}
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
  constructor(public payload: KeycloakGroup[]) {}
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

export type GroupActions =
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
