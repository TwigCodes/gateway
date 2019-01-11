import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { normalize, schema } from 'normalizr';
import {
  GroupActions,
  ActionTypes
} from '@app/admin/actions/groups/group.actions';
import { KeycloakGroupDTO } from '@app/admin/admin.model';
import { DEFAULT_PAGE_SIZE } from '@app/libs';
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
      const group = new schema.Entity('group');
      group.define({ subGroups: [group] });
      const normalizedData = normalize(apiResult, group);
      return {
        ...state,
        ...adapter.addMany(_.values(normalizedData.entities['group']), state),
        count: state.count + 1,
        topLevelNodeIds: [...state.topLevelNodeIds, normalizedData.result]
      };
    }
    case ActionTypes.AddChildSuccess: {
      const apiResult = action.payload.child;
      const group = new schema.Entity('group');
      group.define({ subGroups: [group] });
      const normalizedData = normalize(apiResult, group);
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
      const apiResult = action.payload;

      const newTopLevelNodeIds = state.topLevelNodeIds.filter(
        input => apiResult !== input
      );
      const deletedIds = [...state.entities[apiResult].subGroups, apiResult];
      return {
        ...state,
        ...adapter.removeMany(deletedIds, state),
        topLevelNodeIds: newTopLevelNodeIds,
        count: state.count - 1 >= 0 ? state.count : 0,
        selectedId: null
      };
    }
    case ActionTypes.SearchSuccess: {
      const apiResult = action.payload;
      const group = new schema.Entity('group');
      group.define({ subGroups: [group] });
      const normalizedData = normalize(apiResult, [group]);
      const groupEntities = normalizedData.entities['group'];
      return {
        ...adapter.addAll(_.values(groupEntities), state),
        topLevelNodeIds: [...normalizedData.result]
      };
    }
    case ActionTypes.LoadPageSuccess: {
      const apiResult = action.payload;
      const group = new schema.Entity('group');
      group.define({ subGroups: [group] });
      const normalizedData = normalize(apiResult, [group]);
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
      const group = new schema.Entity('group');
      group.define({ subGroups: [group] });
      const normalizedData = normalize(apiResult, [group]);
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
