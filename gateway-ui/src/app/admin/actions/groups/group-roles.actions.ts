import { Action } from '@ngrx/store';
import { KeycloakRole, KeycloakGroup } from '../../admin.model';

export enum ActionTypes {
  AddRolesToGroup = '[GroupDetailPage] Add Role To Group',
  AddRolesToGroupSuccess = '[UserAPI] Add Role To Group Success',
  AddRolesToGroupFail = '[UserAPI] Add Role To Group Fail',
  DeleteRolesFromGroup = '[GroupDetailPage] Delete Role from Group',
  DeleteRolesFromGroupSuccess = '[UserAPI] Delete Role from Group Success',
  DeleteRolesFromGroupFail = '[UserAPI] Delete Role from Group Fail',
  GetRealmRolesOfGroup = '[GroupDetailPage] Get Realm Roles of Group',
  GetRealmRolesOfGroupSuccess = '[UserAPI] Get Realm Roles of Group Success',
  GetRealmRolesOfGroupFail = '[UserAPI] Get Realm Roles of Group Fail',
  GetAvailableRolesOfGroup = '[GroupDetailPage] Get Available Roles of Group',
  GetAvailableRolesOfGroupSuccess = '[UserAPI] Get Available Roles of Group Success',
  GetAvailableRolesOfGroupFail = '[UserAPI] Get Available Roles of Group Fail'
}

export class AddRolesToGroupAction implements Action {
  readonly type = ActionTypes.AddRolesToGroup;
  constructor(
    public payload: { roles: KeycloakRole[]; group: KeycloakGroup }
  ) {}
}

export class AddRolesToGroupSuccessAction implements Action {
  readonly type = ActionTypes.AddRolesToGroupSuccess;
  constructor(public payload: KeycloakRole[]) {}
}

export class AddRolesToGroupFailAction implements Action {
  readonly type = ActionTypes.AddRolesToGroupFail;
  constructor(public payload: string) {}
}

export class DeleteRolesFromGroupAction implements Action {
  readonly type = ActionTypes.DeleteRolesFromGroup;
  constructor(
    public payload: { roles: KeycloakRole[]; group: KeycloakGroup }
  ) {}
}

export class DeleteRolesFromGroupSuccessAction implements Action {
  readonly type = ActionTypes.DeleteRolesFromGroupSuccess;
  constructor(public payload: KeycloakRole[]) {}
}

export class DeleteRolesFromGroupFailAction implements Action {
  readonly type = ActionTypes.DeleteRolesFromGroupFail;
  constructor(public payload: string) {}
}

export class GetRealmRolesOfGroupAction implements Action {
  readonly type = ActionTypes.GetRealmRolesOfGroup;
  constructor(public payload: string) {}
}

export class GetRealmRolesOfGroupSuccessAction implements Action {
  readonly type = ActionTypes.GetRealmRolesOfGroupSuccess;
  constructor(public payload: KeycloakRole[]) {}
}

export class GetRealmRolesOfGroupFailAction implements Action {
  readonly type = ActionTypes.GetRealmRolesOfGroupFail;
  constructor(public payload: string) {}
}

export class GetAvailableRolesOfGroupAction implements Action {
  readonly type = ActionTypes.GetAvailableRolesOfGroup;
  constructor(public payload: string) {}
}

export class GetAvailableRolesOfGroupSuccessAction implements Action {
  readonly type = ActionTypes.GetAvailableRolesOfGroupSuccess;
  constructor(public payload: KeycloakRole[]) {}
}

export class GetAvailableRolesOfGroupFailAction implements Action {
  readonly type = ActionTypes.GetAvailableRolesOfGroupFail;
  constructor(public payload: string) {}
}

export type GroupRoleMappingActions =
  | AddRolesToGroupAction
  | AddRolesToGroupSuccessAction
  | AddRolesToGroupFailAction
  | DeleteRolesFromGroupAction
  | DeleteRolesFromGroupSuccessAction
  | DeleteRolesFromGroupFailAction
  | GetRealmRolesOfGroupAction
  | GetRealmRolesOfGroupSuccessAction
  | GetRealmRolesOfGroupFailAction
  | GetAvailableRolesOfGroupAction
  | GetAvailableRolesOfGroupSuccessAction
  | GetAvailableRolesOfGroupFailAction;
