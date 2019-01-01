import * as fromUsers from './users.selectors';
import * as fromUserRoles from './user-roles.selectors';

export const getUsers = fromUsers.selectAll;
export const getUserSearch = fromUsers.selectSearch;
export const getUserPageIndex = fromUsers.selectPageIndex;
export const getUserPageSize = fromUsers.selectPageSize;
export const getUserFilter = fromUsers.selectFilter;
export const getUserCount = fromUsers.selectCount;
export const getUserSelected = fromUsers.selectUserSelected;

export const getUserRoles = fromUserRoles.selectAll;
export const getUserRolesLoading = fromUserRoles.selectLoading;
