import { UserActions, ActionTypes } from '../../actions/users/user.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { KeycloakUser } from '../../admin.model';
import { Filter } from '@app/libs/entity/filter.service';

export interface State extends EntityState<KeycloakUser> {
  pageIndex: number;
  pageSize: number;
  count: number;
  filter: Filter | null;
  search: string | null;
}

export const adapter: EntityAdapter<KeycloakUser> = createEntityAdapter<
  KeycloakUser
>({
  selectId: (user: KeycloakUser) => user.id,
  sortComparer: false
});

const initialState = adapter.getInitialState({
  pageIndex: 0,
  pageSize: 25,
  count: 0,
  filter: null,
  search: null
});

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case ActionTypes.AddSuccess: {
      return {
        ...state,
        ...adapter.addOne(action.payload, state),
        count: state.count + 1
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
        ...adapter.removeOne(action.payload, state),
        count: state.count - 1 >= 0 ? state.count : 0
      };
    }
    case ActionTypes.LoadPageSuccess: {
      return {
        ...adapter.addAll(action.payload, state)
      };
    }
    case ActionTypes.CountSuccess: {
      return {
        ...state,
        count: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
