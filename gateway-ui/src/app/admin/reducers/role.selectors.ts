import { createSelector } from '@ngrx/store';
import { selectAdminState } from './admin.state';
import * as fromRole from './role.reducer';

export const selectRoleState = createSelector(
  selectAdminState,
  state => state.role
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromRole.adapter.getSelectors(selectRoleState);

export const selectRoleById = (id: string) =>
  createSelector(
    selectRoleState,
    state => (state.entities[id] ? state.entities[id] : null)
  );
