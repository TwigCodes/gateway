import { RoleActions, ActionTypes } from '../actions/role.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { KeycloakRole } from '../admin.model';

export interface State extends EntityState<KeycloakRole> {}

export const adapter: EntityAdapter<KeycloakRole> = createEntityAdapter<
  KeycloakRole
>({
  selectId: (role: KeycloakRole) => role.id,
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
          { id: action.payload.id, changes: action.payload },
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
    default: {
      return state;
    }
  }
}
