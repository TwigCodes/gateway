import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../services';

import * as fromRoleMapping from '../../actions/roles/role-mapping.actions';

@Injectable()
export class RoleMappingEffects {
  constructor(private actions$: Actions, private roleMapping: UserService) {}

  @Effect() addUserToRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleMapping.AddUserToRoleAction>(
      fromRoleMapping.ActionTypes.AddUserToRole
    ),
    switchMap(action =>
      this.roleMapping
        .addRolesToUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleMapping.AddUserToRoleSuccessAction(
                action.payload.user
              )
          ),
          catchError(err =>
            of(new fromRoleMapping.AddUserToRoleFailAction(err))
          )
        )
    )
  );

  @Effect() deleteUserFromRole$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleMapping.DeleteUserFromRoleAction>(
      fromRoleMapping.ActionTypes.DeleteUserFromRole
    ),
    switchMap(action =>
      this.roleMapping
        .deleteRolesFromUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleMapping.DeleteUserFromRoleSuccessAction(
                action.payload.user.id
              )
          ),
          catchError(err =>
            of(new fromRoleMapping.DeleteUserFromRoleFailAction(err))
          )
        )
    )
  );

  @Effect() addRoleToUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleMapping.AddRoleToUserAction>(
      fromRoleMapping.ActionTypes.AddRoleToUser
    ),
    switchMap(action =>
      this.roleMapping
        .addRolesToUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleMapping.AddRoleToUserSuccessAction(
                action.payload.role
              )
          ),
          catchError(err =>
            of(new fromRoleMapping.AddRoleToUserFailAction(err))
          )
        )
    )
  );

  @Effect() deleteRoleFromUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromRoleMapping.DeleteRoleFromUserAction>(
      fromRoleMapping.ActionTypes.DeleteRoleFromUser
    ),
    switchMap(action =>
      this.roleMapping
        .deleteRolesFromUser(action.payload.user.id, [action.payload.role])
        .pipe(
          map(
            _ =>
              new fromRoleMapping.DeleteRoleFromUserSuccessAction(
                action.payload.role.name
              )
          ),
          catchError(err =>
            of(new fromRoleMapping.DeleteRoleFromUserFailAction(err))
          )
        )
    )
  );
}
