import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  RoleUsersActions,
  ActionTypes
} from '../../actions/roles/role-users.actions';
import { KeycloakUser, KeycloakRole } from '../../admin.model';

export interface State extends EntityState<KeycloakUser> {
  pageIndex: number;
  pageSize: number;
  loading: boolean;
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
  loading: false
});

export function reducer(state = initialState, action: RoleUsersActions): State {
  switch (action.type) {
    case ActionTypes.NextPageSuccess: {
      return { ...state, ...adapter.addMany(action.payload, state) };
    }
    case ActionTypes.GetUsersByRoleSuccess: {
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
    case ActionTypes.AddUserToRoleSuccess: {
      return { ...state, ...adapter.addOne(action.payload, state) };
    }
    case ActionTypes.DeleteUserFromRoleSuccess: {
      return { ...state, ...adapter.removeOne(action.payload, state) };
    }
    default: {
      return state;
    }
  }
}
