import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RoleActions, ActionTypes } from '../../actions/roles/role.actions';
import { KeycloakRole } from '../../admin.model';

import * as _ from 'lodash';

export interface State extends EntityState<KeycloakRole> {
  selectedId: string | null;
}

export const adapter: EntityAdapter<KeycloakRole> = createEntityAdapter<
  KeycloakRole
>({
  selectId: (role: KeycloakRole) => role.name,
  sortComparer: false
});

const initialState = adapter.getInitialState({
  selectedId: null
});

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
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.Select: {
      return { ...state, selectedId: action.payload };
    }
    default: {
      return state;
    }
  }
}
