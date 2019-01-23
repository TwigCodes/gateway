import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromRealmRoles from './realm-roles.reducer';

export const selectRealmRolesState = createSelector(
  selectAdminState,
  state => state.realm_roles
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromRealmRoles.adapter.getSelectors(selectRealmRolesState);

export const selectLoading = createSelector(
  selectRealmRolesState,
  state => state.loading
);
