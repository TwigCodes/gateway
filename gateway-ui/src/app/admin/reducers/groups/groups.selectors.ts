import { createSelector } from '@ngrx/store';
import { schema, denormalize } from 'normalizr';
import { selectAdminState } from '../admin.state';
import { KeycloakGroupDTO, KeycloakGroup } from '@app/admin/admin.model';

import * as fromUser from './groups.reducer';

export const selectGroupsState = createSelector(
  selectAdminState,
  state => state.groups
);

export const {
  selectIds: selectIds,
  selectEntities: selectEntities,
  selectAll: selectAll
} = fromUser.adapter.getSelectors(selectGroupsState);

export const selectCount = createSelector(
  selectGroupsState,
  state => state.count
);

export const selectPageIndex = createSelector(
  selectGroupsState,
  state => state.pageIndex
);

export const selectPageSize = createSelector(
  selectGroupsState,
  state => state.pageSize
);

export const selectSearch = createSelector(
  selectGroupsState,
  state => state.search
);

const getGroup = (
  id: string,
  entities: { [id: string]: KeycloakGroupDTO }
): KeycloakGroup => {
  if (id == null || entities[id] == null) {
    return null;
  }
  return {
    ...entities[id],
    subGroups: entities[id].subGroups.map(groupId =>
      getGroup(groupId, entities)
    )
  };
};

export const selectSelected = createSelector(
  selectGroupsState,
  state => getGroup(state.selectedId, state.entities)
);

export const selectShowLoadMore = createSelector(
  selectGroupsState,
  state => state.showLoadMore
);

export const selectTopLevelNodeIds = createSelector(
  selectGroupsState,
  state => state.topLevelNodeIds
);

export const selectAllInTree = createSelector(
  selectEntities,
  selectTopLevelNodeIds,
  (groups, topIds) => {
    const group = new schema.Entity('group');
    group.define({
      subGroups: [group]
    });

    const denormalizeData = denormalize(topIds, [group], {
      group: groups
    });
    return denormalizeData as KeycloakGroup[];
  }
);

export const selectParentId = (selectedId: string) =>
  createSelector(
    selectAll,
    selectTopLevelNodeIds,
    (all, top) => {
      if (
        top.includes(selectedId) ||
        all.filter(grp => grp.id === selectedId).length === 0
      ) {
        return null;
      }
      const subs = all.filter(sub => sub.subGroups.includes(selectedId));

      return subs.length > 0 ? subs[0].id : null;
    }
  );
