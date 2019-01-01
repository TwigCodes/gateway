import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { AppState } from '@app/core';

import * as fromRole from './roles/roles.reducer';
import * as fromUsers from './users/users.reducer';
import * as fromGroup from './groups/groups.reducer';
import * as fromRoleUsers from './roles/role-users.reducer';
import * as fromUserRoles from './users/user-roles.reducer';
import * as fromMembers from './groups/members.reducer';
import * as fromAvailableRoles from './groups/available-roles.reducer';
import * as fromRealmRoles from './groups/realm-roles.reducer';
export interface AdminState {
  groups: fromGroup.State;
  members: fromMembers.State;
  available_roles: fromAvailableRoles.State;
  realm_roles: fromRealmRoles.State;
  role: fromRole.State;
  role_users: fromRoleUsers.State;
  users: fromUsers.State;
  user_roles: fromUserRoles.State;
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
  role_users: fromRoleUsers.reducer,
  users: fromUsers.reducer,
  user_roles: fromUserRoles.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
