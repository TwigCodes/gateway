import { RoleDetailActions, ActionTypes } from '../actions/role-detail.actions';
import { KeycloakUser, KeycloakRole } from '../admin.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<KeycloakUser> {
  pageIndex: number;
  pageSize: number;
  loading: boolean;
  role: KeycloakRole | null;
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
  role: null
});

export function reducer(
  state = initialState,
  action: RoleDetailActions
): State {
  switch (action.type) {
    case ActionTypes.GetUsersByRoleSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.PageChange: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.LoadStart: {
      return { ...state, loading: true };
    }
    case ActionTypes.LoadingComplete: {
      return { ...state, loading: false };
    }
    case ActionTypes.GetById: {
      return { ...state, role: action.payload };
    }
    default: {
      return state;
    }
  }
}
