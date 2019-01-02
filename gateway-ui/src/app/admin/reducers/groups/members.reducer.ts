import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  GroupDetailActions,
  ActionTypes
} from '../../actions/groups/group-users.actions';
import { KeycloakUser } from '../../admin.model';

import * as fromGroupMapping from '../../actions/groups/group-mapping.actions';

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

export function reducer(
  state = initialState,
  action: GroupDetailActions | fromGroupMapping.GroupMappingActions
): State {
  switch (action.type) {
    case ActionTypes.NextPageSuccess: {
      return { ...state, ...adapter.addMany(action.payload, state) };
    }
    case ActionTypes.GetUsersByGroupSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case fromGroupMapping.ActionTypes.AddUserToGroupSuccess: {
      return { ...state, ...adapter.addOne(action.payload, state) };
    }
    case fromGroupMapping.ActionTypes.DeleteUserFromGroupSuccess: {
      return { ...state, ...adapter.removeOne(action.payload, state) };
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
    default: {
      return state;
    }
  }
}
