import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { selectUserById } from '../reducers/users/user.selectors';
import {
  switchMap,
  map,
  catchError,
  tap,
  filter,
  first,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../services';

import * as fromUser from '../actions/user.actions';
import * as fromUserDetail from '../actions/user-detail.actions';
import * as fromAdminReducer from '../reducers';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router,
    private store: Store<fromAdminReducer.State>
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

  @Effect({ dispatch: false })
  successAndNavigate = this.actions$.pipe(
    ofType<fromUser.UpdateSuccessAction | fromUser.DeleteSuccessAction>(
      fromUser.ActionTypes.UpdateSuccess,
      fromUser.ActionTypes.DeleteSuccess
    ),
    tap(_ => this.router.navigate(['/admin/users']))
  );

  @Effect()
  getById = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(
      (action: any) =>
        action.payload.event.url.indexOf('/admin/users') > -1 &&
        action.payload.routerState.params['userId']
    ),
    map(action => action.payload.routerState.params['userId']),
    switchMap(userId =>
      this.store.pipe(
        select(selectUserById(userId)),
        filter(val => val != null),
        first(),
        map(user => new fromUserDetail.GetByIdAction(user))
      )
    )
  );

  @Effect()
  getRolesByUser = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(
      (action: any) =>
        action.payload.event.url.indexOf('/admin/users') > -1 &&
        action.payload.routerState.params['userId']
    ),
    map(action => action.payload.routerState.params['userId']),
    switchMap(roleId =>
      this.store.pipe(
        select(selectUserById(roleId)),
        filter(val => val != null),
        first(),
        map(user => user.id)
      )
    ),
    switchMap(userId =>
      this.service.getRolesByUserId(userId).pipe(
        map(result => new fromUserDetail.GetRolesByUserSuccessAction(result)),
        catchError(err => of(new fromUserDetail.GetRolesByUserFailAction(err)))
      )
    )
  );
}
