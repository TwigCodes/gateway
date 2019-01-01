import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromAvailableRoles from './available-roles.reducer';

export const selectAvailableRolesState = createSelector(
  selectAdminState,
  state => state.available_roles
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromAvailableRoles.adapter.getSelectors(selectAvailableRolesState);

export const selectLoading = createSelector(
  selectAvailableRolesState,
  state => state.loading
);
