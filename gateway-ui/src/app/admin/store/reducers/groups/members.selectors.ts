import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromMembers from './members.reducer';

export const selectMembersState = createSelector(
  selectAdminState,
  state => state.members
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromMembers.adapter.getSelectors(selectMembersState);

export const selectPageIndex = createSelector(
  selectMembersState,
  state => state.pageIndex
);

export const selectPageSize = createSelector(
  selectMembersState,
  state => state.pageSize
);

export const selectLoading = createSelector(
  selectMembersState,
  state => state.loading
);
