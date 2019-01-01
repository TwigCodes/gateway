import * as fromRoles from './roles.selectors';
import * as fromRoleUsers from './role-users.selectors';

export const getRoles = fromRoles.selectAll;
export const getRoleSelected = fromRoles.selectRoleSelected;

export const getRoleUsers = fromRoleUsers.selectAll;
export const getRoleUsersLoading = fromRoleUsers.selectLoading;
export const getRoleUsersPageIndex = fromRoleUsers.selectPageIndex;
export const getRoleUsersPageSize = fromRoleUsers.selectPageSize;
