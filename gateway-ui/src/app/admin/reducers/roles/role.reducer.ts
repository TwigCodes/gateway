import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RoleActions, ActionTypes } from '../../actions/roles/role.actions';
import { KeycloakRole } from '../../admin.model';

import * as _ from 'lodash';

export interface State extends EntityState<KeycloakRole> {}

export const adapter: EntityAdapter<KeycloakRole> = createEntityAdapter<
  KeycloakRole
>({
  selectId: (role: KeycloakRole) => role.name,
  sortComparer: false
});

const initialState = adapter.getInitialState();

export function reducer(state = initialState, action: RoleActions): State {
  switch (action.type) {
    case ActionTypes.AddSuccess: {
      return {
        ...state,
        ...adapter.addOne(action.payload, state)
      };
    }
    case ActionTypes.UpdateSuccess: {
      return {
        ...adapter.updateOne(
          { id: action.payload.name, changes: action.payload },
          state
        )
      };
    }
    case ActionTypes.DeleteSuccess: {
      return {
        ...state,
        ...adapter.removeOne(action.payload, state)
      };
    }
    case ActionTypes.GetAllSuccess: {
      const invisibleRoleIds = ['uma_authorization', 'offline_access'];
      const newRoles = action.payload.filter(
        role => !_.includes(invisibleRoleIds, role.name)
      );
      return { ...adapter.addAll(newRoles, state) };
    }
    default: {
      return state;
    }
  }
}
