import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  GroupDetailActions,
  ActionTypes
} from '@app/admin/actions/groups/group-users.actions';
import { KeycloakUser } from '@app/admin/admin.model';
import { DEFAULT_PAGE_SIZE } from '@app/libs';
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
  pageSize: DEFAULT_PAGE_SIZE,
  loading: false
});

export function reducer(
  state = initialState,
  action: GroupDetailActions
): State {
  switch (action.type) {
    case ActionTypes.NextPageSuccess: {
      return { ...state, ...adapter.addMany(action.payload, state) };
    }
    case ActionTypes.GetUsersByGroupSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.AddUserToGroupSuccess: {
      return { ...state, ...adapter.addOne(action.payload, state) };
    }
    case ActionTypes.DeleteUserFromGroupSuccess: {
      return { ...state, ...adapter.removeOne(action.payload, state) };
    }
    case ActionTypes.PageChange: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.NextPage: {
      return { ...state, pageIndex: state.pageIndex + 1 };
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
