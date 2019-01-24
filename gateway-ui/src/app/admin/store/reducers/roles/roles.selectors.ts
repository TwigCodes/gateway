import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromRole from './roles.reducer';

export const selectRoleState = createSelector(
  selectAdminState,
  state => state.role
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromRole.adapter.getSelectors(selectRoleState);

export const selectRoleSelected = createSelector(
  selectRoleState,
  state => (state.selectedId === null ? null : state.entities[state.selectedId])
);

export const selectRoleRealm = createSelector(
  selectRoleState,
  state => state.realm
);
