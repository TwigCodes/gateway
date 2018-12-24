import { Action } from '@ngrx/store';
import { KeycloakRole } from '../admin.model';

export enum ActionTypes {
  Add = '[RolePage] Add',
  AddSuccess = '[RoleApi] Add Success',
  AddFail = '[RoleApi] Add Fail',
  Delete = '[RolePage] Delete',
  DeleteSuccess = '[RoleApi] Delete Success',
  DeleteFail = '[RoleApi] Delete Fail',
  Update = '[RolePage] Update',
  UpdateSuccess = '[RoleApi] Update Success',
  UpdateFail = '[RoleApi] Update Fail',
  GetAll = '[RolePage] GetAll',
  GetAllSuccess = '[RoleApi] GetAll Success',
  GetAllFail = '[RoleApi] GetAll Fail'
}

export class AddAction implements Action {
  readonly type = ActionTypes.Add;
  constructor(public payload: Partial<KeycloakRole>) {}
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.AddSuccess;
  constructor(public payload: KeycloakRole) {}
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
  constructor(public payload: { id: string; update: KeycloakRole }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UpdateSuccess;
  constructor(public payload: KeycloakRole) {}
}

export class UpdateFailAction implements Action {
  readonly type = ActionTypes.UpdateFail;
  constructor(public payload: string) {}
}

export class GetAllAction implements Action {
  readonly type = ActionTypes.GetAll;
  constructor() {}
}

export class GetAllSuccessAction implements Action {
  readonly type = ActionTypes.GetAllSuccess;
  constructor(public payload: KeycloakRole[]) {}
}

export class GetAllFailAction implements Action {
  readonly type = ActionTypes.GetAllFail;
  constructor(public payload: string) {}
}

export type RoleActions =
  | AddAction
  | AddSuccessAction
  | AddFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | GetAllAction
  | GetAllSuccessAction
  | GetAllFailAction;
