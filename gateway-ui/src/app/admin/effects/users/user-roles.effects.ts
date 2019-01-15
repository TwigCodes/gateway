import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { UserService } from '@app/admin/services';

import * as fromUser from '@app/admin/actions/users/user.actions';
import * as fromUserRoles from '@app/admin/actions/users/user-roles.actions';
import * as fromAdmin from '@app/admin/reducers';

@Injectable()
export class UserRolesEffects {
  @Effect() addRoleToUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromUserRoles.AddRoleToUserAction>(
      fromUserRoles.ActionTypes.AddRoleToUser
    ),
    switchMap(action =>
      this.service
        .addRolesToUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromUserRoles.AddRoleToUserSuccessAction(action.payload.role)
          ),
          catchError(err => of(new fromUserRoles.AddRoleToUserFailAction(err)))
        )
    )
  );

  @Effect() deleteRoleFromUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromUserRoles.DeleteRoleFromUserAction>(
      fromUserRoles.ActionTypes.DeleteRoleFromUser
    ),
    switchMap(action =>
      this.service
        .deleteRolesFromUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromUserRoles.DeleteRoleFromUserSuccessAction(
                action.payload.role.name
              )
          ),
          catchError(err =>
            of(new fromUserRoles.DeleteRoleFromUserFailAction(err))
          )
        )
    )
  );

  @Effect()
  getRolesByUser = this.actions$.pipe(
    ofType<fromUser.SelectAction>(fromUser.ActionTypes.Select),
    map(action => action.payload),
    switchMap(_ => this.store.pipe(select(fromAdmin.getUserSelected))),
    filter(val => val != null),
    map(user => user.id),
    switchMap(userId =>
      this.service.getRolesByUserId(userId).pipe(
        map(result => new fromUserRoles.GetRolesByUserSuccessAction(result)),
        catchError(err => of(new fromUserRoles.GetRolesByUserFailAction(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: UserService,
    private store: Store<fromAdmin.State>
  ) {}
}
