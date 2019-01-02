import * as fromGroups from './groups.selectors';
import * as fromMembers from './members.selectors';
import * as fromRealmRoles from './realm-roles.selectors';
import * as fromAvailableRoles from './available-roles.selectors';

export const getGroups = fromGroups.selectAll;
export const getSelectedGroup = fromGroups.selectSelected;
export const getGroupsTree = fromGroups.selectAllInTree;
export const getGroupsPageIndex = fromGroups.selectPageIndex;
export const getGroupsPageSize = fromGroups.selectPageSize;
export const getGroupsShowLoadMore = fromGroups.selectShowLoadMore;

export const getMembers = fromMembers.selectAll;
export const getMembersPageIndex = fromMembers.selectPageIndex;
export const getMembersPageSize = fromMembers.selectPageSize;
export const getMembersLoading = fromMembers.selectLoading;

export const getRealmRoles = fromRealmRoles.selectAll;
export const getRealmRolesLoading = fromRealmRoles.selectLoading;

export const getAvailableRoles = fromAvailableRoles.selectAll;
export const getAvailableRolesLoading = fromAvailableRoles.selectLoading;
