import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromGroupDetailAvailableRoles from './group-detail-available-roles.reducer';

export const selectGroupDetailAvailableRolesState = createSelector(
  selectAdminState,
  state => state.group_detail_available_roles
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromGroupDetailAvailableRoles.adapter.getSelectors(
  selectGroupDetailAvailableRolesState
);

export const selectLoading = createSelector(
  selectGroupDetailAvailableRolesState,
  state => state.loading
);
