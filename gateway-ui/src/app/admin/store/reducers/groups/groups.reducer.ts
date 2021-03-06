import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { normalize, schema } from 'normalizr';
import {
  GroupActions,
  ActionTypes
} from '@app/admin/store/actions/groups/group.actions';
import { DEFAULT_PAGE_SIZE, KeycloakGroupDTO } from '@app/libs';
import { flatGroupTree } from '@app/admin/admin-utils';
import * as _ from 'lodash';

export interface State extends EntityState<KeycloakGroupDTO> {
  pageIndex: number;
  pageSize: number;
  count: number;
  search: string | null;
  showLoadMore: boolean;
  topLevelNodeIds: string[];
  selectedId: string | null;
}

export const adapter: EntityAdapter<KeycloakGroupDTO> = createEntityAdapter<
  KeycloakGroupDTO
>({
  selectId: (group: KeycloakGroupDTO) => group.id,
  sortComparer: (a: KeycloakGroupDTO, b: KeycloakGroupDTO) =>
    a.name.localeCompare(b.name)
});

const initialState = adapter.getInitialState({
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  count: 0,
  search: null,
  showLoadMore: true,
  topLevelNodeIds: [],
  selectedId: null
});

export function reducer(state = initialState, action: GroupActions): State {
  switch (action.type) {
    case ActionTypes.AddTopSuccess: {
      const apiResult = action.payload;
      const normalizedData = flatGroupTree(apiResult);
      return {
        ...state,
        ...adapter.addMany(_.values(normalizedData.entities['group']), state),
        count: state.count + 1,
        topLevelNodeIds: [...state.topLevelNodeIds, normalizedData.result]
      };
    }
    case ActionTypes.AddChildSuccess: {
      const apiResult = action.payload.child;
      const normalizedData = flatGroupTree(apiResult);
      const parentId = action.payload.parentId;
      const parentEntity = state.entities[parentId];
      const newParentEntity = {
        ...parentEntity,
        subGroups: [...parentEntity.subGroups, apiResult.id]
      };
      const newState = {
        ...state,
        entities: { ...state.entities, [parentId]: newParentEntity }
      };
      return {
        ...newState,
        ...adapter.addMany(
          _.values(normalizedData.entities['group']),
          newState
        ),
        count: state.count + 1
      };
    }
    case ActionTypes.UpdateSuccess: {
      return {
        ...adapter.updateOne(
          {
            id: action.payload.id,
            changes: {
              ...action.payload,
              subGroups: action.payload.subGroups.map(group => group.id)
            }
          },
          state
        )
      };
    }
    case ActionTypes.DeleteSuccess: {
      const apiResult = action.payload as string;

      const newTopLevelNodeIds = state.topLevelNodeIds.filter(
        input => apiResult !== input
      );
      const deletedIds = [...state.entities[apiResult].subGroups, apiResult];
      const deletedState = adapter.removeMany(deletedIds, state);
      const parentNode = (state.ids as string[]).filter(id =>
        state.entities[id].subGroups.includes(apiResult)
      );
      let newState = deletedState;
      if (parentNode.length > 0) {
        const toUpdate = state.entities[parentNode[0]] as KeycloakGroupDTO;
        newState = adapter.updateOne(
          {
            id: toUpdate.id,
            changes: {
              ...toUpdate,
              subGroups: toUpdate.subGroups.filter(id => id !== apiResult)
            }
          },
          deletedState
        );
      }
      return {
        ...state,
        ...newState,
        topLevelNodeIds: newTopLevelNodeIds,
        count: state.count - 1 >= 0 ? state.count : 0,
        selectedId: null
      };
    }
    case ActionTypes.SearchSuccess: {
      const apiResult = action.payload;
      const normalizedData = flatGroupTree(apiResult);
      const groupEntities = normalizedData.entities['group'];
      return {
        ...adapter.addAll(_.values(groupEntities), state),
        topLevelNodeIds: [...normalizedData.result]
      };
    }
    case ActionTypes.LoadPageSuccess: {
      const apiResult = action.payload;
      const normalizedData = flatGroupTree(apiResult);
      const groupEntities = normalizedData.entities['group'];
      return {
        ...state,
        ...adapter.addMany(_.values(groupEntities), state),
        topLevelNodeIds: _.union(state.topLevelNodeIds, normalizedData.result),
        pageIndex: 0
      };
    }
    case ActionTypes.NextPageSuccess: {
      const apiResult = action.payload;
      const normalizedData = flatGroupTree(apiResult);
      const groupEntities = normalizedData.entities['group'];
      return {
        ...state,
        ...adapter.addMany(_.values(groupEntities), state),
        topLevelNodeIds: _.union(state.topLevelNodeIds, normalizedData.result),
        pageIndex: apiResult.length > 0 ? state.pageIndex + 1 : state.pageIndex
      };
    }
    case ActionTypes.Search: {
      return { ...state, search: action.payload, showLoadMore: false };
    }
    case ActionTypes.ClearSearch: {
      return initialState;
    }
    case ActionTypes.CountSuccess: {
      return { ...state, count: action.payload };
    }
    case ActionTypes.Select: {
      return { ...state, selectedId: action.payload };
    }
    default: {
      return state;
    }
  }
}
