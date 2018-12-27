import { createSelector } from '@ngrx/store';
import { selectAdminState } from './admin.state';
import * as fromRoleDetail from './role-detail.reducer';

export const selectRoleDetailState = createSelector(
  selectAdminState,
  state => state.roledetail
);

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectUsers
} = fromRoleDetail.adapter.getSelectors(selectRoleDetailState);

export const selectPageIndex = createSelector(
  selectRoleDetailState,
  state => state.pageIndex
);

export const selectPageSize = createSelector(
  selectRoleDetailState,
  state => state.pageSize
);

export const selectLoading = createSelector(
  selectRoleDetailState,
  state => state.loading
);

export const selectRole = createSelector(
  selectRoleDetailState,
  state => state.role
);
