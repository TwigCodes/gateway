import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services';
import * as fromUser from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private service: UserService) {}
  @Effect()
  add = this.actions$.pipe(
    ofType<fromUser.AddAction>(fromUser.ActionTypes.Add),
    switchMap(action =>
      this.service.add(action.payload).pipe(
        map(user => new fromUser.AddSuccessAction(user)),
        catchError(err => of(new fromUser.AddFailAction(err)))
      )
    )
  );

  @Effect()
  delete = this.actions$.pipe(
    ofType<fromUser.DeleteAction>(fromUser.ActionTypes.Delete),
    switchMap(action =>
      this.service.delete(action.payload).pipe(
        map(_ => new fromUser.DeleteSuccessAction(action.payload)),
        catchError(err => of(new fromUser.DeleteFailAction(err)))
      )
    )
  );

  @Effect()
  update = this.actions$.pipe(
    ofType<fromUser.UpdateAction>(fromUser.ActionTypes.Update),
    switchMap(action =>
      this.service.update(action.payload.id, action.payload.update).pipe(
        map(_ => new fromUser.UpdateSuccessAction(action.payload.update)),
        catchError(err => of(new fromUser.UpdateFailAction(err)))
      )
    )
  );

  @Effect()
  loadPage = this.actions$.pipe(
    ofType<fromUser.LoadPageAction>(fromUser.ActionTypes.LoadPage),
    switchMap(action =>
      this.service
        .paged(action.payload.pageIndex, action.payload.pageSize)
        .pipe(
          map(result => new fromUser.LoadPageSuccessAction(result)),
          catchError(err => of(new fromUser.LoadPageFailAction(err)))
        )
    )
  );
}
