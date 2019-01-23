import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  UserActions,
  ActionTypes
} from '@app/admin/store/actions/users/user.actions';
import { KeycloakUser } from '@app/admin/admin.model';
import { Filter, DEFAULT_PAGE_SIZE } from '@app/libs';

export interface State extends EntityState<KeycloakUser> {
  pageIndex: number;
  pageSize: number;
  count: number;
  filter: Filter | null;
  search: string | null;
  selectedId: string | null;
}

export const adapter: EntityAdapter<KeycloakUser> = createEntityAdapter<
  KeycloakUser
>({
  selectId: (user: KeycloakUser) => user.id,
  sortComparer: false
});

const initialState = adapter.getInitialState({
  pageIndex: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  count: 0,
  filter: null,
  search: null,
  selectedId: null
});

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case ActionTypes.AddSuccess: {
      return {
        ...state,
        ...adapter.addOne(action.payload, state),
        count: state.count + 1
      };
    }
    case ActionTypes.UpdateSuccess: {
      return {
        ...adapter.updateOne(
          { id: action.payload.id, changes: action.payload },
          state
        )
      };
    }
    case ActionTypes.DeleteSuccess: {
      return {
        ...state,
        ...adapter.removeOne(action.payload, state),
        count: state.count - 1 >= 0 ? state.count : 0,
        selectedId: null
      };
    }
    case ActionTypes.SearchSuccess:
    case ActionTypes.LoadPageSuccess: {
      return {
        ...adapter.addAll(action.payload, state)
      };
    }
    case ActionTypes.CountSuccess: {
      return {
        ...state,
        count: action.payload
      };
    }
    case ActionTypes.Select: {
      return { ...state, selectedId: action.payload };
    }
    default: {
      return state;
    }
  }
}
