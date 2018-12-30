import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  GroupDetailActions,
  ActionTypes
} from '../actions/group-detail.actions';
import { KeycloakUser, KeycloakGroup } from '../admin.model';

export interface State extends EntityState<KeycloakUser> {
  pageIndex: number;
  pageSize: number;
  loading: boolean;
  group: KeycloakGroup | null;
}

export const adapter: EntityAdapter<KeycloakUser> = createEntityAdapter<
  KeycloakUser
>({
  selectId: (user: KeycloakUser) => user.id,
  sortComparer: false
});

const initialState: State = adapter.getInitialState({
  pageIndex: 0,
  pageSize: 25,
  loading: false,
  group: null
});

export function reducer(
  state = initialState,
  action: GroupDetailActions
): State {
  switch (action.type) {
    case ActionTypes.NextPageSuccess: {
      return { ...state, ...adapter.addMany(action.payload, state) };
    }
    case ActionTypes.GetUsersByGroupSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.PageChange: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.NextPage: {
      return { ...state, pageIndex: (state.pageIndex + 1) * state.pageSize };
    }
    case ActionTypes.LoadStart: {
      return { ...state, loading: true };
    }
    case ActionTypes.LoadingComplete: {
      return { ...state, loading: false };
    }
    case ActionTypes.GetById: {
      return { ...state, group: action.payload };
    }
    default: {
      return state;
    }
  }
}
