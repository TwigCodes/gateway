import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';

import * as fromUsers from './users.reducer';

export const selectUserState = createSelector(
  selectAdminState,
  state => state.users
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromUsers.adapter.getSelectors(selectUserState);

export const selectCount = createSelector(
  selectUserState,
  state => state.count
);

export const selectPageIndex = createSelector(
  selectUserState,
  state => state.pageIndex
);

export const selectPageSize = createSelector(
  selectUserState,
  state => state.pageSize
);

export const selectFilter = createSelector(
  selectUserState,
  state => state.filter
);

export const selectSearch = createSelector(
  selectUserState,
  state => state.search
);

export const selectUserSelected = createSelector(
  selectUserState,
  state => state.entities[state.selectedId]
);
