import {
  UserDetailActions,
  ActionTypes
} from '../../actions/users/user-detail.actions';
import { KeycloakUser, KeycloakRole } from '../../admin.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import * as fromRoleMapping from '../../actions/roles/role-mapping.actions';

export interface State extends EntityState<KeycloakRole> {
  loading: boolean;
  user: KeycloakUser | null;
}

export const adapter: EntityAdapter<KeycloakRole> = createEntityAdapter<
  KeycloakRole
>({
  selectId: (role: KeycloakRole) => role.name,
  sortComparer: false
});

const initialState: State = adapter.getInitialState({
  loading: false,
  user: null
});

export function reducer(
  state = initialState,
  action: UserDetailActions | fromRoleMapping.RoleMappingActions
): State {
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
    case ActionTypes.GetById: {
      return { ...state, user: action.payload };
    }
    case fromRoleMapping.ActionTypes.AddRoleToUserSuccess: {
      return { ...state, ...adapter.addOne(action.payload, state) };
    }
    case fromRoleMapping.ActionTypes.DeleteRoleFromUserSuccess: {
      return { ...state, ...adapter.removeOne(action.payload, state) };
    }
    default: {
      return state;
    }
  }
}
