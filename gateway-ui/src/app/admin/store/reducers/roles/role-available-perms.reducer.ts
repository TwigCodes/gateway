import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  RolePermissionsActions,
  ActionTypes
} from '@app/admin/store/actions/roles/role-permissions.actions';
import { Permission } from '@app/libs';

export interface State extends EntityState<Permission> {}

export const adapter: EntityAdapter<Permission> = createEntityAdapter<
  Permission
>({
  selectId: (perm: Permission) => perm.id,
  sortComparer: false
});

const initialState: State = adapter.getInitialState({});

export function reducer(
  state = initialState,
  action: RolePermissionsActions
): State {
  switch (action.type) {
    case ActionTypes.GetAvailablePermsByRoleSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    default: {
      return state;
    }
  }
}
