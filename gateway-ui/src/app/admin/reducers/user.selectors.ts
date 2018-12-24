import { createSelector } from '@ngrx/store';
import { selectAdminState } from './admin.state';

import * as fromUser from './user.reducer';

export const selectUserState = createSelector(
  selectAdminState,
  state => state.user
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromUser.adapter.getSelectors(selectUserState);

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
