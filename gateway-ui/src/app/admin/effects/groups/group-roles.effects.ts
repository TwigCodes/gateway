import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { GroupService } from '@app/admin/services';

import * as fromGroupRoles from '@app/admin/actions/groups/group-roles.actions';
import * as fromGroup from '@app/admin/actions/groups/group.actions';
import * as fromAdmin from '@app/admin/reducers';

@Injectable()
export class GroupRolesEffects {
  constructor(
    private actions$: Actions,
    private service: GroupService,
    private store: Store<fromAdmin.State>
  ) {}

  @Effect()
  prepareAvailable = this.actions$.pipe(
    ofType<fromGroup.SelectAction>(fromGroup.ActionTypes.Select),
    map(action => action.payload),
    switchMap(__ => this.store.pipe(select(fromAdmin.getSelectedGroup))),
    filter(val => val != null),
    map(({ id }) => new fromGroupRoles.GetAvailableRolesOfGroupAction(id))
  );

  @Effect()
  prepareRealm = this.actions$.pipe(
    ofType<fromGroup.SelectAction>(fromGroup.ActionTypes.Select),
    map(action => action.payload),
    switchMap(__ => this.store.pipe(select(fromAdmin.getSelectedGroup))),
    filter(val => val != null),
    map(({ id }) => new fromGroupRoles.GetRealmRolesOfGroupAction(id))
  );

  @Effect()
  loadAvailableRoles = this.actions$.pipe(
    ofType<fromGroupRoles.GetAvailableRolesOfGroupAction>(
      fromGroupRoles.ActionTypes.GetAvailableRolesOfGroup
    ),
    map(action => action.payload),
    switchMap(groupId => {
      return this.service.getGroupAvailableRoles(groupId).pipe(
        map(
          roles =>
            new fromGroupRoles.GetAvailableRolesOfGroupSuccessAction(roles)
        ),
        catchError(err =>
          of(new fromGroupRoles.GetAvailableRolesOfGroupFailAction(err))
        )
      );
    })
  );

  @Effect()
  loadRealmRoles = this.actions$.pipe(
    ofType<fromGroupRoles.GetRealmRolesOfGroupAction>(
      fromGroupRoles.ActionTypes.GetRealmRolesOfGroup
    ),
    map(action => action.payload),
    switchMap(groupId => {
      return this.service.getGroupRealmRoles(groupId).pipe(
        map(
          roles => new fromGroupRoles.GetRealmRolesOfGroupSuccessAction(roles)
        ),
        catchError(err =>
          of(new fromGroupRoles.GetRealmRolesOfGroupFailAction(err))
        )
      );
    })
  );

  @Effect()
  addRolesToGroup = this.actions$.pipe(
    ofType<fromGroupRoles.AddRolesToGroupAction>(
      fromGroupRoles.ActionTypes.AddRolesToGroup
    ),
    map(action => action.payload),
    switchMap(({ roles, group }) => {
      return this.service.addRoleToGroup(group.id, roles).pipe(
        map(__ => new fromGroupRoles.AddRolesToGroupSuccessAction(roles)),
        catchError(err => of(new fromGroupRoles.AddRolesToGroupFailAction(err)))
      );
    })
  );

  @Effect()
  deleteRolesToGroup = this.actions$.pipe(
    ofType<fromGroupRoles.DeleteRolesFromGroupAction>(
      fromGroupRoles.ActionTypes.DeleteRolesFromGroup
    ),
    map(action => action.payload),
    switchMap(({ roles, group }) => {
      return this.service.deleteRolesFromGroup(group.id, roles).pipe(
        map(
          roleIds =>
            new fromGroupRoles.DeleteRolesFromGroupSuccessAction(roleIds)
        ),
        catchError(err =>
          of(new fromGroupRoles.DeleteRolesFromGroupFailAction(err))
        )
      );
    })
  );
}
