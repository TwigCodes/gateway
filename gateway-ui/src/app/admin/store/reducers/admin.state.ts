import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '@app/core';

import * as fromUsers from './users/users.reducer';
import * as fromUserRoles from './users/user-roles.reducer';
import * as fromUserGroups from './users/user-groups.reducer';
import * as fromRole from './roles/roles.reducer';
import * as fromRoleUsers from './roles/role-users.reducer';
import * as fromRolePermissions from './roles/role-permissions.reducer';
import * as fromAvailablePerms from './roles/role-available-perms.reducer';
import * as fromGroup from './groups/groups.reducer';
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
  role_permissions: fromRolePermissions.State;
  role_available_perms: fromAvailablePerms.State;
  users: fromUsers.State;
  user_roles: fromUserRoles.State;
  user_groups: fromUserGroups.State;
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
  role_permissions: fromRolePermissions.reducer,
  role_available_perms: fromAvailablePerms.reducer,
  users: fromUsers.reducer,
  user_roles: fromUserRoles.reducer,
  user_groups: fromUserGroups.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
