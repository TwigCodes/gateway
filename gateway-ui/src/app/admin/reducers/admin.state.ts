import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '@app/core';

import * as fromRole from './roles/role.reducer';
import * as fromUser from './users/user.reducer';
import * as fromGroup from './groups/group.reducer';
import * as fromRoleDetail from './roles/role-detail.reducer';
import * as fromUserDetail from './users/user-detail.reducer';
import * as fromGroupDetail from './groups/group-detail.reducer';
import * as fromGroupDetailAvailableRoles from './groups/group-detail-available-roles.reducer';
import * as fromGroupDetailRealmRoles from './groups/group-detail-realm-roles.reducer';

export interface AdminState {
  group: fromGroup.State;
  group_detail: fromGroupDetail.State;
  group_detail_available_roles: fromGroupDetailAvailableRoles.State;
  group_detail_realm_roles: fromGroupDetailRealmRoles.State;
  role: fromRole.State;
  roledetail: fromRoleDetail.State;
  user: fromUser.State;
  userdetail: fromUserDetail.State;
}

export interface State extends AppState {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  group: fromGroup.reducer,
  group_detail: fromGroupDetail.reducer,
  group_detail_available_roles: fromGroupDetailAvailableRoles.reducer,
  group_detail_realm_roles: fromGroupDetailRealmRoles.reducer,
  role: fromRole.reducer,
  roledetail: fromRoleDetail.reducer,
  user: fromUser.reducer,
  userdetail: fromUserDetail.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
