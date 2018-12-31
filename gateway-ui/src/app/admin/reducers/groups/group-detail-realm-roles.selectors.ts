import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromGroupDetailRealmRoles from './group-detail-realm-roles.reducer';

export const selectGroupDetailRealmRolesState = createSelector(
  selectAdminState,
  state => state.group_detail_realm_roles
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromGroupDetailRealmRoles.adapter.getSelectors(
  selectGroupDetailRealmRolesState
);

export const selectLoading = createSelector(
  selectGroupDetailRealmRolesState,
  state => state.loading
);
