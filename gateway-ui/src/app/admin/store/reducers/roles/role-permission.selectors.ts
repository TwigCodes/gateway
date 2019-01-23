import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromRolePermissions from './role-permissions.reducer';

export const selectRolePermissionsState = createSelector(
  selectAdminState,
  state => state.role_permissions
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromRolePermissions.adapter.getSelectors(selectRolePermissionsState);
