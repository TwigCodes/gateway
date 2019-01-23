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
import { UserService, RoleService } from '@app/admin/services';

import * as fromRole from '@app/admin/store/actions/roles/role.actions';
import * as fromRoleUsers from '@app/admin/store/actions/roles/role-users.actions';
import * as fromAdmin from '@app/admin/store/reducers';

@Injectable()
export class RoleUsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private roleService: RoleService,
    private store: Store<fromAdmin.State>
  ) {}

  @Effect() addUserToRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleUsers.AddUserToRoleAction>(
      fromRoleUsers.ActionTypes.AddUserToRole
    ),
    switchMap(action =>
      this.userService
        .addRolesToUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleUsers.AddUserToRoleSuccessAction(action.payload.user)
          ),
          catchError(err => of(new fromRoleUsers.AddUserToRoleFailAction(err)))
        )
    )
  );

  @Effect() deleteUserFromRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleUsers.DeleteUserFromRoleAction>(
      fromRoleUsers.ActionTypes.DeleteUserFromRole
    ),
    switchMap(action =>
      this.userService
        .deleteRolesFromUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleUsers.DeleteUserFromRoleSuccessAction(
                action.payload.user.id
              )
          ),
          catchError(err =>
            of(new fromRoleUsers.DeleteUserFromRoleFailAction(err))
          )
        )
    )
  );

  @Effect()
  getUsersByRole = this.actions$.pipe(
    ofType<fromRole.SelectAction>(fromRole.ActionTypes.Select),
    map(action => action.payload),
    switchMap(id => this.store.pipe(select(fromAdmin.getRoleSelected))),
    filter(val => val != null),
    map(role => role.name),
    withLatestFrom(
      this.store.pipe(select(fromAdmin.getRoleUsersPageIndex)),
      this.store.pipe(select(fromAdmin.getRoleUsersPageSize))
    ),
    switchMap(([name, pageIndex, pageSize]) =>
      this.roleService.getUsersByRoleName(name, pageIndex, pageSize).pipe(
        map(result => new fromRoleUsers.GetUsersByRoleSuccessAction(result)),
        catchError(err => of(new fromRoleUsers.GetUsersByRoleFailAction(err)))
      )
    )
  );

  @Effect()
  getNextPageUsers = this.actions$.pipe(
    ofType<fromRoleUsers.NextPageAction>(fromRoleUsers.ActionTypes.NextPage),
    withLatestFrom(
      this.store.pipe(select(fromAdmin.getRoleSelected)),
      this.store.pipe(select(fromAdmin.getRoleUsersPageIndex)),
      this.store.pipe(select(fromAdmin.getRoleUsersPageSize))
    ),
    switchMap(([_, role, pageIndex, pageSize]) =>
      this.roleService.getUsersByRoleName(role.name, pageIndex, pageSize).pipe(
        map(result => new fromRoleUsers.NextPageSuccessAction(result)),
        catchError(err => of(new fromRoleUsers.NextPageFailAction(err)))
      )
    )
  );
}
