import { createSelector } from '@ngrx/store';

import * as fromRoles from './roles.selectors';
import * as fromRoleUsers from './role-users.selectors';
import * as fromRolePermissions from './role-permission.selectors';
import * as fromRoleAvailablePerms from './role-available-perms.selectors';
import * as _ from 'lodash';

export const getRoles = fromRoles.selectAll;
export const getRoleSelected = fromRoles.selectRoleSelected;
export const getRoleTenant = fromRoles.selectRoleRealm;

export const getRoleUsers = fromRoleUsers.selectAll;
export const getRoleUsersLoading = fromRoleUsers.selectLoading;
export const getRoleUsersPageIndex = fromRoleUsers.selectPageIndex;
export const getRoleUsersPageSize = fromRoleUsers.selectPageSize;
export const getRolePermissions = fromRolePermissions.selectAll;
export const getRoleAvailabePerms = createSelector(
  fromRoleAvailablePerms.selectAll,
  getRolePermissions,
  (all, selected) =>
    _.differenceWith(
      all,
      selected.map(rp => rp.permission),
      (curr, excl) => curr.objectId === excl.objectId
    )
);
