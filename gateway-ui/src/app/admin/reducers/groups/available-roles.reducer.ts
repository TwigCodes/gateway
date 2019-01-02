import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  GroupRoleMappingActions,
  ActionTypes
} from '../../actions/groups/group-roles.actions';
import { KeycloakRole } from '../../admin.model';

import * as fromGroup from '../../actions/groups/group-users.actions';

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

export function reducer(
  state = initialState,
  action: GroupRoleMappingActions | fromGroup.GroupDetailActions
): State {
  switch (action.type) {
    case ActionTypes.AddRolesToGroupSuccess: {
      return {
        ...state,
        ...adapter.removeMany(action.payload.map(role => role.name), state)
      };
    }
    case ActionTypes.DeleteRolesFromGroupSuccess: {
      return {
        ...state,
        ...adapter.addMany(action.payload, state)
      };
    }
    case ActionTypes.GetAvailableRolesOfGroupSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    default: {
      return state;
    }
  }
}
