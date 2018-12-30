import { GroupActions, ActionTypes } from '../actions/group.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { KeycloakGroupDTO } from '../admin.model';
import { normalize, schema } from 'normalizr';
import * as _ from 'lodash';

export interface State extends EntityState<KeycloakGroupDTO> {
  pageIndex: number;
  pageSize: number;
  count: number;
  search: string | null;
  topLevelNodeIds: string[];
}

export const adapter: EntityAdapter<KeycloakGroupDTO> = createEntityAdapter<
  KeycloakGroupDTO
>({
  selectId: (group: KeycloakGroupDTO) => group.id,
  sortComparer: (a: KeycloakGroupDTO, b: KeycloakGroupDTO) =>
    a.id.localeCompare(b.id)
});

const initialState = adapter.getInitialState({
  pageIndex: 0,
  pageSize: 25,
  count: 0,
  search: null,
  topLevelNodeIds: []
});

export function reducer(state = initialState, action: GroupActions): State {
  switch (action.type) {
    case ActionTypes.AddSuccess: {
      const apiResult = action.payload;
      const group = new schema.Entity('group');
      group.define({ subGroups: [group] });
      const normalizedData = normalize(apiResult, group);
      return {
        ...state,
        ...adapter.addMany(_.values(normalizedData.entities['group']), state),
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
        count: state.count - 1 >= 0 ? state.count : 0
      };
    }
    case ActionTypes.LoadPageSuccess: {
      const apiResult = action.payload;
      const group = new schema.Entity('group');
      group.define({ subGroups: [group] });
      const normalizedData = normalize(apiResult, [group]);
      const groupEntities = normalizedData.entities['group'];
      return {
        ...adapter.addAll(_.values(groupEntities), state),
        topLevelNodeIds: normalizedData.result
      };
    }
    case ActionTypes.CountSuccess: {
      return {
        ...state,
        count: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
