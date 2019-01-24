import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  RolePermissionsActions,
  ActionTypes
} from '@app/admin/store/actions/roles/role-permissions.actions';
import { RolePermission } from '@app/libs';

export interface State extends EntityState<RolePermission> {}

export const adapter: EntityAdapter<RolePermission> = createEntityAdapter<
  RolePermission
>({
  selectId: (rolePermission: RolePermission) => rolePermission.id,
  sortComparer: false
});

const initialState: State = adapter.getInitialState({});

export function reducer(
  state = initialState,
  action: RolePermissionsActions
): State {
  switch (action.type) {
    case ActionTypes.GetPermissionsByRoleSuccess: {
      return { ...adapter.addAll(action.payload, state) };
    }
    case ActionTypes.AddPermissionToRoleSuccess: {
      return { ...state, ...adapter.addOne(action.payload, state) };
    }
    case ActionTypes.DeletePermissionFromRoleSuccess: {
      return { ...state, ...adapter.removeOne(action.payload, state) };
    }
    default: {
      return state;
    }
  }
}
