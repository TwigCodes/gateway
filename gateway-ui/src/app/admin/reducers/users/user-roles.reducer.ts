import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  UserRolesActions,
  ActionTypes
} from '../../actions/users/user-roles.actions';
import { KeycloakRole } from '../../admin.model';

export interface State extends EntityState<KeycloakRole> {
  loading: boolean;
}

export const adapter: EntityAdapter<KeycloakRole> = createEntityAdapter<
  KeycloakRole
>({
  selectId: (role: KeycloakRole) => role.name,
  sortComparer: false
});

const initialState: State = adapter.getInitialState({
  loading: false
});

export function reducer(state = initialState, action: UserRolesActions): State {
  switch (action.type) {
    case ActionTypes.GetRolesByUserSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.LoadStart: {
      return { ...state, loading: true };
    }
    case ActionTypes.LoadingComplete: {
      return { ...state, loading: false };
    }
    case ActionTypes.AddRoleToUserSuccess: {
      return { ...state, ...adapter.addOne(action.payload, state) };
    }
    case ActionTypes.DeleteRoleFromUserSuccess: {
      return { ...state, ...adapter.removeOne(action.payload, state) };
    }
    default: {
      return state;
    }
  }
}
