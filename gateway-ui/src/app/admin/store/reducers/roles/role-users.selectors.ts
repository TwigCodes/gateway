import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromRoleUsers from './role-users.reducer';

export const selectRoleUsersState = createSelector(
  selectAdminState,
  state => state.role_users
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromRoleUsers.adapter.getSelectors(selectRoleUsersState);

export const selectPageIndex = createSelector(
  selectRoleUsersState,
  state => state.pageIndex
);

export const selectPageSize = createSelector(
  selectRoleUsersState,
  state => state.pageSize
);

export const selectLoading = createSelector(
  selectRoleUsersState,
  state => state.loading
);
