import { createSelector } from '@ngrx/store';
import { selectAdminState } from './admin.state';
import * as fromUserDetail from './user-detail.reducer';

export const selectUserDetailState = createSelector(
  selectAdminState,
  state => state.userdetail
);

export const {
  selectIds: selectRoleIds,
  selectEntities: selectRoleEntities,
  selectAll: selectRoles
} = fromUserDetail.adapter.getSelectors(selectUserDetailState);

export const selectLoading = createSelector(
  selectUserDetailState,
  state => state.loading
);

export const selectUser = createSelector(
  selectUserDetailState,
  state => state.user
);
