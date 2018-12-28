import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import {
  switchMap,
  map,
  catchError,
  filter,
  withLatestFrom,
  first,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RoleService, UserService } from '../services';
import { selectRoleById } from '../reducers/role.selectors';

import * as fromRoleDetailSelector from '../reducers/role-detail.selectors';
import * as fromRole from '../actions/role.actions';
import * as fromRoleDetail from '../actions/role-detail.actions';
import * as fromAdminReducer from '../reducers';

@Injectable()
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private service: RoleService,
    private userService: UserService,
    private store: Store<fromAdminReducer.State>,
    private router: Router
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

  @Effect({ dispatch: false })
  successAndNavigate = this.actions$.pipe(
    ofType<fromRole.UpdateSuccessAction | fromRole.DeleteSuccessAction>(
      fromRole.ActionTypes.UpdateSuccess,
      fromRole.ActionTypes.DeleteSuccess
    ),
    tap(_ => this.router.navigate(['/admin/roles']))
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
    switchMap(roleId =>
      this.store.pipe(
        select(selectRoleById(roleId)),
        filter(val => val != null),
        first(),
        map(role => new fromRoleDetail.GetByIdAction(role))
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
        filter(val => val != null),
        first(),
        map(role => role.name)
      )
    ),
    withLatestFrom(
      this.store.pipe(select(fromRoleDetailSelector.selectPageIndex)),
      this.store.pipe(select(fromRoleDetailSelector.selectPageSize))
    ),
    switchMap(([name, pageIndex, pageSize]) =>
      this.service.getUsersByRoleName(name, pageIndex, pageSize).pipe(
        map(result => new fromRoleDetail.GetUsersByRoleSuccessAction(result)),
        catchError(err => of(new fromRoleDetail.GetUsersByRoleFailAction(err)))
      )
    )
  );

  @Effect()
  getNextPageUsers = this.actions$.pipe(
    ofType<fromRoleDetail.NextPageAction>(fromRoleDetail.ActionTypes.NextPage),
    withLatestFrom(
      this.store.pipe(select(fromRoleDetailSelector.selectPageIndex)),
      this.store.pipe(select(fromRoleDetailSelector.selectPageSize))
    ),
    switchMap(([_, pageIndex, pageSize]) =>
      this.userService.paged(pageIndex, pageSize).pipe(
        map(result => new fromRoleDetail.NextPageSuccessAction(result)),
        catchError(err => of(new fromRoleDetail.NextPageFailAction(err)))
      )
    )
  );
}
