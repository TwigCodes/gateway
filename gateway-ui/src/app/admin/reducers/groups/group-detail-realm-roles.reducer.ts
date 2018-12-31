import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  GroupRoleMappingActions,
  ActionTypes
} from '../../actions/group-detail-roles.actions';
import { KeycloakRole, KeycloakGroup } from '../../admin.model';

import * as fromGroup from '../../actions/group-detail.actions';

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
      return { ...state, ...adapter.addMany(action.payload, state) };
    }
    case ActionTypes.GetRealmRolesOfGroupSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.DeleteRolesFromGroupSuccess: {
      return {
        ...state,
        ...adapter.removeMany(action.payload.map(role => role.name), state)
      };
    }
    default: {
      return state;
    }
  }
}
