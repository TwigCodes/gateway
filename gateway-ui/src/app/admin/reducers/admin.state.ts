import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { AppState } from '@app/core';

import * as fromRole from './roles/role.reducer';
import * as fromUser from './users/user.reducer';
import * as fromGroup from './groups/groups.reducer';
import * as fromRoleDetail from './roles/role-detail.reducer';
import * as fromUserDetail from './users/user-detail.reducer';
import * as fromMembers from './groups/members.reducer';
import * as fromAvailableRoles from './groups/available-roles.reducer';
import * as fromRealmRoles from './groups/realm-roles.reducer';
export interface AdminState {
  groups: fromGroup.State;
  members: fromMembers.State;
  available_roles: fromAvailableRoles.State;
  realm_roles: fromRealmRoles.State;
  role: fromRole.State;
  roledetail: fromRoleDetail.State;
  user: fromUser.State;
  userdetail: fromUserDetail.State;
}

export interface State extends AppState {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  groups: fromGroup.reducer,
  members: fromMembers.reducer,
  available_roles: fromAvailableRoles.reducer,
  realm_roles: fromRealmRoles.reducer,
  role: fromRole.reducer,
  roledetail: fromRoleDetail.reducer,
  user: fromUser.reducer,
  userdetail: fromUserDetail.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
