import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import {
  switchMap,
  map,
  catchError,
  filter,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '@app/admin/services';

import * as fromUser from '@app/admin/store/actions/users/user.actions';
import * as fromAdmin from '@app/admin/store/reducers';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private service: UserService,
    private store: Store<fromAdmin.State>
  ) {}
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

  @Effect()
  count = this.actions$.pipe(
    ofType<fromUser.CountAction>(fromUser.ActionTypes.Count),
    switchMap(_ =>
      this.service.count().pipe(
        map(result => new fromUser.CountSuccessAction(result)),
        catchError(err => of(new fromUser.CountFailAction(err)))
      )
    )
  );

  @Effect()
  select = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(
      (action: any) =>
        action.payload.event.url.indexOf('/admin/users') > -1 &&
        action.payload.routerState.params['userId']
    ),
    map(action => action.payload.routerState.params['userId']),
    map(userId => new fromUser.SelectAction(userId))
  );

  @Effect()
  search = this.actions$.pipe(
    ofType<fromUser.SearchAction>(fromUser.ActionTypes.Search),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromAdmin.getUserPageIndex)),
      this.store.pipe(select(fromAdmin.getUserPageSize))
    ),
    switchMap(([filterStr, pageIndex, pageSize]) =>
      this.service.search(filterStr, pageIndex, pageSize).pipe(
        map(result => new fromUser.SearchSuccessAction(result)),
        catchError(err => of(new fromUser.SearchFailAction(err)))
      )
    )
  );
}
