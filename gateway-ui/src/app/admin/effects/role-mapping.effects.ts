import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../services';

import * as fromRoleDetail from '../actions/role-detail.actions';

@Injectable()
export class RoleMappingEffects {
  constructor(private actions$: Actions, private roleMapping: UserService) {}

  @Effect() addUserToRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleDetail.AddUserToRoleAction>(
      fromRoleDetail.ActionTypes.AddUserToRole
    ),
    switchMap(action =>
      this.roleMapping
        .addRolesToUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleDetail.AddUserToRoleSuccessAction(action.payload.user)
          ),
          catchError(err => of(new fromRoleDetail.AddUserToRoleFailAction(err)))
        )
    )
  );

  @Effect() deleteUserFromRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleDetail.DeleteUserFromRoleAction>(
      fromRoleDetail.ActionTypes.DeleteUserFromRole
    ),
    switchMap(action =>
      this.roleMapping
        .deleteRolesFromUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleDetail.DeleteUserFromRoleSuccessAction(
                action.payload.user.id
              )
          ),
          catchError(err =>
            of(new fromRoleDetail.DeleteUserFromRoleFailAction(err))
          )
        )
    )
  );
}
