import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromAvailablePerms from './role-available-perms.reducer';

export const selectRoleAvailablePermsState = createSelector(
  selectAdminState,
  state => state.role_available_perms
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromAvailablePerms.adapter.getSelectors(selectRoleAvailablePermsState);
