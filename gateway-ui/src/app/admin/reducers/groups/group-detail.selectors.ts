import { createSelector } from '@ngrx/store';
import { selectAdminState } from '../admin.state';
import * as fromGroupDetail from './group-detail.reducer';

export const selectGroupDetailState = createSelector(
  selectAdminState,
  state => state.group_detail
);

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectUsers
} = fromGroupDetail.adapter.getSelectors(selectGroupDetailState);

export const selectPageIndex = createSelector(
  selectGroupDetailState,
  state => state.pageIndex
);

export const selectPageSize = createSelector(
  selectGroupDetailState,
  state => state.pageSize
);

export const selectLoading = createSelector(
  selectGroupDetailState,
  state => state.loading
);

export const selectGroup = createSelector(
  selectGroupDetailState,
  state => state.group
);
