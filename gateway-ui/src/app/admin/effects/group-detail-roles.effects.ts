import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
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
import { GroupService } from '../services';

import * as fromGroupDetailRoles from '../actions/group-detail-roles.actions';
import * as fromAdminReducer from '../reducers';
import * as fromGroupDetailSelectors from '../reducers/groups/group-detail.selectors';

@Injectable()
export class GroupDetailRolesEffects {
  constructor(
    private actions$: Actions,
    private service: GroupService,
    private store: Store<fromAdminReducer.State>
  ) {}
  @Effect()
  loadAvailableRoles = this.actions$.pipe(
    ofType<fromGroupDetailRoles.GetAvailableRolesOfGroupAction>(
      fromGroupDetailRoles.ActionTypes.GetAvailableRolesOfGroup
    ),
    withLatestFrom(
      this.store.pipe(select(fromGroupDetailSelectors.selectGroup))
    ),
    switchMap(([_, group]) => {
      return this.service.getGroupAvailableRoles(group.id).pipe(
        map(
          roles =>
            new fromGroupDetailRoles.GetAvailableRolesOfGroupSuccessAction(
              roles
            )
        ),
        catchError(err =>
          of(new fromGroupDetailRoles.GetAvailableRolesOfGroupFailAction(err))
        )
      );
    })
  );

  @Effect()
  loadRealmRoles = this.actions$.pipe(
    ofType<fromGroupDetailRoles.GetRealmRolesOfGroupAction>(
      fromGroupDetailRoles.ActionTypes.GetRealmRolesOfGroup
    ),
    withLatestFrom(
      this.store.pipe(select(fromGroupDetailSelectors.selectGroup))
    ),
    switchMap(([_, group]) => {
      return this.service.getGroupRealmRoles(group.id).pipe(
        map(
          roles =>
            new fromGroupDetailRoles.GetRealmRolesOfGroupSuccessAction(roles)
        ),
        catchError(err =>
          of(new fromGroupDetailRoles.GetRealmRolesOfGroupFailAction(err))
        )
      );
    })
  );
}
