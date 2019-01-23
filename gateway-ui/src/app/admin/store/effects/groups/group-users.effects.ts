import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '@app/admin/services';

import * as fromGroupUsers from '@app/admin/store/actions/groups/group-users.actions';

@Injectable()
export class GroupUsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect() addUserToGroup$: Observable<Action> = this.actions$.pipe(
    ofType<fromGroupUsers.AddUserToGroupAction>(
      fromGroupUsers.ActionTypes.AddUserToGroup
    ),
    switchMap(action =>
      this.userService
        .addUserToGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(
            _ =>
              new fromGroupUsers.AddUserToGroupSuccessAction(
                action.payload.user
              )
          ),
          catchError(err =>
            of(new fromGroupUsers.AddUserToGroupFailAction(err))
          )
        )
    )
  );

  @Effect() deleteUserFromGroup$: Observable<Action> = this.actions$.pipe(
    ofType<fromGroupUsers.DeleteUserFromGroupAction>(
      fromGroupUsers.ActionTypes.DeleteUserFromGroup
    ),
    switchMap(action =>
      this.userService
        .deleteUserFromGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(
            _ =>
              new fromGroupUsers.DeleteUserFromGroupSuccessAction(
                action.payload.user.id
              )
          ),
          catchError(err =>
            of(new fromGroupUsers.DeleteUserFromGroupFailAction(err))
          )
        )
    )
  );
}
