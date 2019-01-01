import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromUserRoles from './user-roles.reducer';

export const selectUserRolesState = createSelector(
  selectAdminState,
  state => state.user_roles
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromUserRoles.adapter.getSelectors(selectUserRolesState);

export const selectLoading = createSelector(
  selectUserRolesState,
  state => state.loading
);
