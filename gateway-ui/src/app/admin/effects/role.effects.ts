import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import {
  switchMap,
  map,
  catchError,
  filter,
  distinctUntilChanged,
  withLatestFrom,
  first
} from 'rxjs/operators';
import { of } from 'rxjs';
import { RoleService } from '../services';
import { selectRoleById } from '../reducers/role.selectors';

import * as selRoleDetail from '../reducers/role-detail.selectors';
import * as fromRole from '../actions/role.actions';
import * as fromRoleDetail from '../actions/role-detail.actions';
import * as stateAdmin from '../reducers';
import { tag } from 'rxjs-spy/operators';

@Injectable()
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private service: RoleService,
    private store: Store<stateAdmin.State>
  ) {}

  @Effect()
  add = this.actions$.pipe(
    ofType<fromRole.AddAction>(fromRole.ActionTypes.Add),
    switchMap(action =>
      this.service.add(action.payload).pipe(
        map(user => new fromRole.AddSuccessAction(user)),
        catchError(err => of(new fromRole.AddFailAction(err)))
      )
    )
  );

  @Effect()
  delete = this.actions$.pipe(
    ofType<fromRole.DeleteAction>(fromRole.ActionTypes.Delete),
    switchMap(action =>
      this.service.delete(action.payload).pipe(
        map(_ => new fromRole.DeleteSuccessAction(action.payload)),
        catchError(err => of(new fromRole.DeleteFailAction(err)))
      )
    )
  );

  @Effect()
  update = this.actions$.pipe(
    ofType<fromRole.UpdateAction>(fromRole.ActionTypes.Update),
    switchMap(action =>
      this.service.update(action.payload.id, action.payload.update).pipe(
        map(_ => new fromRole.UpdateSuccessAction(action.payload.update)),
        catchError(err => of(new fromRole.UpdateFailAction(err)))
      )
    )
  );

  @Effect()
  getAll = this.actions$.pipe(
    ofType<fromRole.GetAllAction>(fromRole.ActionTypes.GetAll),
    switchMap(_ =>
      this.service.getAll().pipe(
        map(result => new fromRole.GetAllSuccessAction(result)),
        catchError(err => of(new fromRole.GetAllFailAction(err)))
      )
    )
  );

  @Effect()
  getById = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(
      (action: any) =>
        action.payload.event.url.indexOf('/admin/roles') > -1 &&
        action.payload.routerState.params['roleId']
    ),
    map(action => action.payload.routerState.params['roleId']),
    tag('hello'),
    switchMap(roleId =>
      this.store.pipe(
        select(selectRoleById(roleId)),
        filter(val => val !== null && val !== undefined),
        first(),
        map(role => new fromRoleDetail.GetById(role))
      )
    )
  );

  @Effect()
  getUsersByRole = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(
      (action: any) =>
        action.payload.event.url.indexOf('/admin/roles') > -1 &&
        action.payload.routerState.params['roleId']
    ),
    map(action => action.payload.routerState.params['roleId']),
    switchMap(roleId =>
      this.store.pipe(
        select(selectRoleById(roleId)),
        filter(val => val !== null && val !== undefined),
        first(),
        map(role => role.name)
      )
    ),
    withLatestFrom(
      this.store.pipe(select(selRoleDetail.selectPageIndex)),
      this.store.pipe(select(selRoleDetail.selectPageSize))
    ),
    switchMap(([name, pageIndex, pageSize]) =>
      this.service.getUsersByRoleName(name, pageIndex, pageSize).pipe(
        map(result => new fromRoleDetail.GetUsersByRoleSuccessAction(result)),
        catchError(err => of(new fromRoleDetail.GetUsersByRoleFailAction(err)))
      )
    )
  );
}
