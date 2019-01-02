import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromUserGroups from './user-groups.reducer';

export const selectUserGroupsState = createSelector(
  selectAdminState,
  state => state.user_groups
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromUserGroups.adapter.getSelectors(selectUserGroupsState);
