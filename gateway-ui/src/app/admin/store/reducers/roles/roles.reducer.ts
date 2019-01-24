import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  RoleActions,
  ActionTypes
} from '@app/admin/store/actions/roles/role.actions';
import { KeycloakRole } from '@app/libs';

import * as fromRouter from '@ngrx/router-store';
import * as _ from 'lodash';

export interface State extends EntityState<KeycloakRole> {
  selectedId: string | null;
  realm: string | null;
}

export const adapter: EntityAdapter<KeycloakRole> = createEntityAdapter<
  KeycloakRole
>({
  selectId: (role: KeycloakRole) => role.id,
  sortComparer: false
});

const initialState = adapter.getInitialState({
  selectedId: null,
  realm: null
});

export function reducer(
  state = initialState,
  action: RoleActions | fromRouter.RouterNavigationAction
): State {
  switch (action.type) {
    case ActionTypes.AddSuccess: {
      return { ...state, ...adapter.addOne(action.payload, state) };
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
        ...adapter.removeOne(action.payload, state),
        selectedId: null
      };
    }
    case ActionTypes.GetAllSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.Select: {
      return { ...state, selectedId: action.payload };
    }
    case fromRouter.ROUTER_NAVIGATION:
      const stateUrl = action.payload.routerState as any;
      const realm = stateUrl.params.realm;
      if (realm != null) {
        return { ...state, realm: stateUrl.params.realm };
      }
      return state;
    default: {
      return state;
    }
  }
}
