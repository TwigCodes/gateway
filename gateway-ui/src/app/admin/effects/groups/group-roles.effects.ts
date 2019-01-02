import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { GroupService } from '../../services';

import * as fromGroupDetailRoles from '../../actions/groups/group-roles.actions';
import * as fromGroup from '../../actions/groups/group.actions';

@Injectable()
export class GroupDetailRolesEffects {
  constructor(private actions$: Actions, private service: GroupService) {}

  @Effect()
  prepareAvailable = this.actions$.pipe(
    ofType<fromGroup.SelectAction>(fromGroup.ActionTypes.Select),
    filter(action => action.payload != null),
    map(action => action.payload),
    map(
      groupId =>
        new fromGroupDetailRoles.GetAvailableRolesOfGroupAction(groupId)
    )
  );

  @Effect()
  prepareRealm = this.actions$.pipe(
    ofType<fromGroup.SelectAction>(fromGroup.ActionTypes.Select),
    filter(action => action.payload != null),
    map(action => action.payload),
    map(groupId => new fromGroupDetailRoles.GetRealmRolesOfGroupAction(groupId))
  );

  @Effect()
  loadAvailableRoles = this.actions$.pipe(
    ofType<fromGroupDetailRoles.GetAvailableRolesOfGroupAction>(
      fromGroupDetailRoles.ActionTypes.GetAvailableRolesOfGroup
    ),
    map(action => action.payload),
    switchMap(groupId => {
      return this.service.getGroupAvailableRoles(groupId).pipe(
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
    map(action => action.payload),
    switchMap(groupId => {
      return this.service.getGroupRealmRoles(groupId).pipe(
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

  @Effect()
  addRolesToGroup = this.actions$.pipe(
    ofType<fromGroupDetailRoles.AddRolesToGroupAction>(
      fromGroupDetailRoles.ActionTypes.AddRolesToGroup
    ),
    map(action => action.payload),
    switchMap(({ roles, group }) => {
      return this.service.addRoleToGroup(group.id, roles).pipe(
        map(
          roles => new fromGroupDetailRoles.AddRolesToGroupSuccessAction(roles)
        ),
        catchError(err =>
          of(new fromGroupDetailRoles.AddRolesToGroupFailAction(err))
        )
      );
    })
  );

  @Effect()
  deleteRolesToGroup = this.actions$.pipe(
    ofType<fromGroupDetailRoles.DeleteRolesFromGroupAction>(
      fromGroupDetailRoles.ActionTypes.DeleteRolesFromGroup
    ),
    map(action => action.payload),
    switchMap(({ roles, group }) => {
      return this.service.deleteRolesFromGroup(group.id, roles).pipe(
        map(
          roleIds =>
            new fromGroupDetailRoles.DeleteRolesFromGroupSuccessAction(roleIds)
        ),
        catchError(err =>
          of(new fromGroupDetailRoles.DeleteRolesFromGroupFailAction(err))
        )
      );
    })
  );
}
