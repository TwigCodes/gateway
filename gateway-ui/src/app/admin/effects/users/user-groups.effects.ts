import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '@app/admin/services';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromUser from '../../actions/users/user.actions';
import * as fromUserGroups from '../../actions/users/user-groups.actions';

@Injectable()
export class UserGroupsEffects {
  @Effect()
  load = this.actions$.pipe(
    ofType<fromUser.SelectAction>(fromUser.ActionTypes.Select),
    map(action => action.payload),
    switchMap(userId =>
      this.service
        .getUserGroups(userId)
        .pipe(
          map(
            groups => new fromUserGroups.LoadSuccessAction(groups),
            catchError(err => of(new fromUserGroups.LoadFailAction(err)))
          )
        )
    )
  );

  @Effect() addGroupToUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromUserGroups.AddAction>(fromUserGroups.ActionTypes.Add),
    switchMap(action =>
      this.service
        .addUserToGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(_ => new fromUserGroups.AddSuccessAction(action.payload.group)),
          catchError(err => of(new fromUserGroups.AddFailAction(err)))
        )
    )
  );

  @Effect() deleteGroupFromUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromUserGroups.DeleteAction>(fromUserGroups.ActionTypes.Delete),
    switchMap(action =>
      this.service
        .deleteUserFromGroup(action.payload.user.id, action.payload.group.id)
        .pipe(
          map(
            _ => new fromUserGroups.DeleteSuccessAction(action.payload.group.id)
          ),
          catchError(err => of(new fromUserGroups.DeleteFailAction(err)))
        )
    )
  );
  constructor(private actions$: Actions, private service: UserService) {}
}
