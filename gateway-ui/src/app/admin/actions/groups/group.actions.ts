import { Action } from '@ngrx/store';
import { KeycloakGroup } from '../../admin.model';

export enum ActionTypes {
  AddTop = '[GroupPage] Add Top',
  AddTopSuccess = '[GroupApi] Add Top Success',
  AddTopFail = '[GroupApi] Add Top Fail',
  AddSibling = '[GroupPage] Add Sibling',
  AddSiblingSuccess = '[GroupApi] Add Sibling Success',
  AddSiblingFail = '[GroupApi] Add Sibling Fail',
  AddChild = '[GroupPage] Add Child',
  AddChildSuccess = '[GroupApi] Add Child Success',
  AddChildFail = '[GroupApi] Add Child Fail',
  Delete = '[GroupPage] Delete',
  DeleteSuccess = '[GroupApi] Delete Success',
  DeleteFail = '[GroupApi] Delete Fail',
  Update = '[GroupPage] Update',
  UpdateSuccess = '[GroupApi] Update Success',
  UpdateFail = '[GroupApi] Update Fail',
  NextPage = '[GroupPage] Next Page',
  NextPageSuccess = '[GroupApi] Next Page Success',
  NextPageFail = '[GroupApi] Next Page Fail',
  LoadPage = '[GroupPage] Load Page',
  LoadPageSuccess = '[GroupApi] Load Page Success',
  LoadPageFail = '[GroupApi] Load Page Fail',
  Count = '[GroupPage] Count',
  CountSuccess = '[GroupApi] Count Success',
  CountFail = '[GroupApi] Count Fail',
  Search = '[GroupPage] Search',
  SearchSuccess = '[GroupApi] Search Success',
  SearchFail = '[GroupApi] Search Fail',
  ClearSearch = '[GroupPage] Clear Search',
  Select = '[GroupPage] Select A Group'
}

export class AddTopAction implements Action {
  readonly type = ActionTypes.AddTop;
  constructor(public payload: Partial<KeycloakGroup>) {}
}

export class AddTopSuccessAction implements Action {
  readonly type = ActionTypes.AddTopSuccess;
  constructor(public payload: KeycloakGroup) {}
}

export class AddTopFailAction implements Action {
  readonly type = ActionTypes.AddTopFail;
  constructor(public payload: string) {}
}

export class AddChildAction implements Action {
  readonly type = ActionTypes.AddChild;
  constructor(
    public payload: { id: string; changes: Partial<KeycloakGroup> }
  ) {}
}

export class AddChildSuccessAction implements Action {
  readonly type = ActionTypes.AddChildSuccess;
  constructor(public payload: { parentId: string; child: KeycloakGroup }) {}
}

export class AddChildFailAction implements Action {
  readonly type = ActionTypes.AddChildFail;
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

export class NextPageAction implements Action {
  readonly type = ActionTypes.NextPage;
  constructor() {}
}

export class NextPageSuccessAction implements Action {
  readonly type = ActionTypes.NextPageSuccess;
  constructor(public payload: KeycloakGroup[]) {}
}

export class NextPageFailAction implements Action {
  readonly type = ActionTypes.NextPageFail;
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

export class SearchAction implements Action {
  readonly type = ActionTypes.Search;
  constructor(public payload: string) {}
}

export class SearchSuccessAction implements Action {
  readonly type = ActionTypes.SearchSuccess;
  constructor(public payload: KeycloakGroup[]) {}
}

export class SearchFailAction implements Action {
  readonly type = ActionTypes.SearchFail;
  constructor(public payload: string) {}
}

export class ClearSearchAction implements Action {
  readonly type = ActionTypes.ClearSearch;
  constructor() {}
}

export class SelectAction implements Action {
  readonly type = ActionTypes.Select;
  constructor(public payload: string) {}
}

export type GroupActions =
  | AddTopAction
  | AddTopSuccessAction
  | AddTopFailAction
  | AddChildAction
  | AddChildSuccessAction
  | AddChildFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | LoadPageAction
  | LoadPageSuccessAction
  | LoadPageFailAction
  | NextPageAction
  | NextPageSuccessAction
  | NextPageFailAction
  | CountAction
  | CountSuccessAction
  | CountFailAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailAction
  | ClearSearchAction
  | SelectAction;
