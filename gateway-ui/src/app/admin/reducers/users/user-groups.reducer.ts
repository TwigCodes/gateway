import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  UserGroupsActions,
  ActionTypes
} from '../../actions/users/user-groups.actions';
import { KeycloakGroup } from '../../admin.model';

export interface State extends EntityState<KeycloakGroup> {
  pageIndex: number;
  pageSize: number;
  search: string | null;
}

export const adapter: EntityAdapter<KeycloakGroup> = createEntityAdapter<
  KeycloakGroup
>({
  selectId: (group: KeycloakGroup) => group.id,
  sortComparer: false
});

const initialState = adapter.getInitialState({
  pageIndex: 0,
  pageSize: 25,
  search: null
});

export function reducer(
  state = initialState,
  action: UserGroupsActions
): State {
  switch (action.type) {
    case ActionTypes.AddSuccess: {
      return {
        ...state,
        ...adapter.addOne(action.payload, state)
      };
    }
    case ActionTypes.DeleteSuccess: {
      return {
        ...state,
        ...adapter.removeOne(action.payload, state)
      };
    }
    case ActionTypes.LoadSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.NextPage: {
      return { ...state, pageIndex: state.pageIndex * state.pageSize + 1 };
    }
    default: {
      return state;
    }
  }
}
