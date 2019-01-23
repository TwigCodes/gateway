import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import { RolePermissionService, PermissionService } from '@app/admin/services';
import { Permission, RolePermission } from '@app/admin/admin.model';

import * as fromRole from '@app/admin/store/actions/roles/role.actions';
import * as fromRolePermissions from '@app/admin/store/actions/roles/role-permissions.actions';
import * as fromRoot from '@app/core/core.state';
import * as fromAdmin from '@app/admin/store/reducers';

@Injectable()
export class RolePermissionsEffects {
  constructor(
    private actions$: Actions,
    private rolePermissions: RolePermissionService,
    private perms: PermissionService,
    private store: Store<fromRoot.AppState>
  ) {}

  @Effect() addPermissionToRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRolePermissions.AddPermissionToRoleAction>(
      fromRolePermissions.ActionTypes.AddPermissionToRole
    ),
    map(action => action.payload),
    switchMap(({ permission, roleName, tenant }) =>
      this.rolePermissions
        .add(
          new RolePermission({
            roleName: roleName,
            tenant: tenant,
            permission: new Permission(permission)
          })
        )
        .pipe(
          map(
            rolePermission =>
              new fromRolePermissions.AddPermissionToRoleSuccessAction(
                new RolePermission(rolePermission)
              )
          ),
          catchError(err =>
            of(new fromRolePermissions.AddPermissionToRoleFailAction(err))
          )
        )
    )
  );

  @Effect() deletePermissionFromRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRolePermissions.DeletePermissionFromRoleAction>(
      fromRolePermissions.ActionTypes.DeletePermissionFromRole
    ),
    switchMap(action =>
      this.rolePermissions.delete(action.payload).pipe(
        map(
          _ =>
            new fromRolePermissions.DeletePermissionFromRoleSuccessAction(
              action.payload
            )
        ),
        catchError(err =>
          of(new fromRolePermissions.DeletePermissionFromRoleFailAction(err))
        )
      )
    )
  );

  @Effect()
  getPermissionsByRole = this.actions$.pipe(
    ofType<fromRole.SelectAction>(fromRole.ActionTypes.Select),
    map(action => action.payload),
    switchMap(id => this.store.pipe(select(fromAdmin.getRoleSelected))),
    filter(val => val != null),
    map(role => role.name),
    withLatestFrom(this.store.pipe(select(fromRoot.getCurrentTenant))),
    switchMap(([roleName, tenant]) =>
      this.rolePermissions.getByRole(roleName, tenant).pipe(
        map(
          result =>
            new fromRolePermissions.GetPermissionsByRoleSuccessAction(result)
        ),
        catchError(err =>
          of(new fromRolePermissions.GetPermissionsByRoleFailAction(err))
        )
      )
    )
  );

  @Effect()
  getAvailablePermsByRole = this.actions$.pipe(
    ofType<fromRole.SelectAction>(fromRole.ActionTypes.Select),
    map(action => action.payload),
    switchMap(id => this.store.pipe(select(fromAdmin.getRoleSelected))),
    filter(val => val != null),
    withLatestFrom(this.store.pipe(select(fromRoot.getCurrentTenant))),
    switchMap(([__, tenant]) =>
      this.perms.getByTenant(tenant).pipe(
        map(
          result =>
            new fromRolePermissions.GetAvailablePermsSuccessAction(result)
        ),
        catchError(err =>
          of(new fromRolePermissions.GetAvailablePermsFailAction(err))
        )
      )
    )
  );
}
