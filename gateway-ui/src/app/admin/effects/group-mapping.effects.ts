import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../services';

import * as fromGroupMapping from '../actions/group-mapping.actions';

@Injectable()
export class GroupMappingEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect() addUserToGroup$: Observable<Action> = this.actions$.pipe(
    ofType<fromGroupMapping.AddUserToGroupAction>(
      fromGroupMapping.ActionTypes.AddUserToGroup
    ),
    switchMap(action =>
      this.userService
        .addUserToGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(
            _ =>
              new fromGroupMapping.AddUserToGroupSuccessAction(
                action.payload.user
              )
          ),
          catchError(err =>
            of(new fromGroupMapping.AddUserToGroupFailAction(err))
          )
        )
    )
  );

  @Effect() deleteUserFromGroup$: Observable<Action> = this.actions$.pipe(
    ofType<fromGroupMapping.DeleteUserFromGroupAction>(
      fromGroupMapping.ActionTypes.DeleteUserFromGroup
    ),
    switchMap(action =>
      this.userService
        .deleteUserFromGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(
            _ =>
              new fromGroupMapping.DeleteUserFromGroupSuccessAction(
                action.payload.user.id
              )
          ),
          catchError(err =>
            of(new fromGroupMapping.DeleteUserFromGroupFailAction(err))
          )
        )
    )
  );

  @Effect() addGroupToUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromGroupMapping.AddGroupToUserAction>(
      fromGroupMapping.ActionTypes.AddGroupToUser
    ),
    switchMap(action =>
      this.userService
        .addUserToGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(
            _ =>
              new fromGroupMapping.AddGroupToUserSuccessAction(
                action.payload.group
              )
          ),
          catchError(err =>
            of(new fromGroupMapping.AddGroupToUserFailAction(err))
          )
        )
    )
  );

  @Effect() deleteGroupFromUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromGroupMapping.DeleteGroupFromUserAction>(
      fromGroupMapping.ActionTypes.DeleteGroupFromUser
    ),
    switchMap(action =>
      this.userService
        .deleteUserFromGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(
            _ =>
              new fromGroupMapping.DeleteGroupFromUserSuccessAction(
                action.payload.group.id
              )
          ),
          catchError(err =>
            of(new fromGroupMapping.DeleteGroupFromUserFailAction(err))
          )
        )
    )
  );
}
