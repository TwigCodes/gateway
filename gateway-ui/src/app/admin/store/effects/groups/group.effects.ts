import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
import {
  switchMap,
  map,
  catchError,
  filter,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs';
import { GroupService } from '@app/admin/services';

import * as fromGroup from '@app/admin/store/actions/groups/group.actions';
import * as fromGroupDetail from '@app/admin/store/actions/groups/group-users.actions';
import * as fromAdmin from '@app/admin/store/reducers';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private service: GroupService,
    private store: Store<fromAdmin.State>
  ) {}
  @Effect()
  add = this.actions$.pipe(
    ofType<fromGroup.AddTopAction>(fromGroup.ActionTypes.AddTop),
    map(action => action.payload),
    switchMap(val => {
      return this.service.add(val).pipe(
        map(group => new fromGroup.AddTopSuccessAction(group)),
        catchError(err => of(new fromGroup.AddTopFailAction(err)))
      );
    })
  );

  @Effect()
  addChild = this.actions$.pipe(
    ofType<fromGroup.AddChildAction>(fromGroup.ActionTypes.AddChild),
    map(action => action.payload),
    switchMap(({ id, changes }) =>
      this.service.updateSubGroups(id, changes).pipe(
        map(
          group =>
            new fromGroup.AddChildSuccessAction({ parentId: id, child: group })
        ),
        catchError(err => of(new fromGroup.AddChildFailAction(err)))
      )
    )
  );

  @Effect()
  delete = this.actions$.pipe(
    ofType<fromGroup.DeleteAction>(fromGroup.ActionTypes.Delete),
    switchMap(action =>
      this.service.delete(action.payload).pipe(
        map(_ => new fromGroup.DeleteSuccessAction(action.payload)),
        catchError(err => of(new fromGroup.DeleteFailAction(err)))
      )
    )
  );

  @Effect()
  update = this.actions$.pipe(
    ofType<fromGroup.UpdateAction>(fromGroup.ActionTypes.Update),
    switchMap(action =>
      this.service.update(action.payload.id, action.payload.update).pipe(
        map(_ => new fromGroup.UpdateSuccessAction(action.payload.update)),
        catchError(err => of(new fromGroup.UpdateFailAction(err)))
      )
    )
  );

  @Effect()
  loadPage = this.actions$.pipe(
    ofType<fromGroup.LoadPageAction>(fromGroup.ActionTypes.LoadPage),
    switchMap(action =>
      this.service
        .paged(action.payload.pageIndex, action.payload.pageSize)
        .pipe(
          map(result => new fromGroup.LoadPageSuccessAction(result)),
          catchError(err => of(new fromGroup.LoadPageFailAction(err)))
        )
    )
  );

  @Effect()
  nextPage = this.actions$.pipe(
    ofType<fromGroup.NextPageAction>(fromGroup.ActionTypes.NextPage),
    withLatestFrom(
      this.store.pipe(select(fromAdmin.getGroupsPageIndex)),
      this.store.pipe(select(fromAdmin.getGroupsPageSize))
    ),
    switchMap(([_, pageIndex, pageSize]) =>
      this.service.paged(pageIndex + 1, pageSize).pipe(
        map(result => new fromGroup.NextPageSuccessAction(result)),
        catchError(err => of(new fromGroup.NextPageFailAction(err)))
      )
    )
  );

  @Effect()
  count = this.actions$.pipe(
    ofType<fromGroup.CountAction>(fromGroup.ActionTypes.Count),
    switchMap(_ =>
      this.service.count().pipe(
        map(result => new fromGroup.CountSuccessAction(result)),
        catchError(err => of(new fromGroup.CountFailAction(err)))
      )
    )
  );

  @Effect()
  search = this.actions$.pipe(
    ofType<fromGroup.SearchAction>(fromGroup.ActionTypes.Search),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(fromAdmin.getGroupsPageSize))),
    switchMap(([search, pageSize]) =>
      this.service.search(search, 0, pageSize).pipe(
        map(result => new fromGroup.SearchSuccessAction(result)),
        catchError(err => of(new fromGroup.SearchFailAction(err)))
      )
    )
  );

  @Effect()
  clearSearch = this.actions$.pipe(
    ofType<fromGroup.ClearSearchAction>(fromGroup.ActionTypes.ClearSearch),
    withLatestFrom(
      this.store.pipe(select(fromAdmin.getGroupsPageIndex)),
      this.store.pipe(select(fromAdmin.getGroupsPageSize))
    ),
    map(
      ([_, pageIndex, pageSize]) =>
        new fromGroup.LoadPageAction({ pageIndex, pageSize })
    )
  );

  @Effect()
  select = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(
      (action: any) =>
        action.payload.event.url.indexOf('/admin/groups') > -1 &&
        action.payload.routerState.params['groupId']
    ),
    map(action => action.payload.routerState.params['groupId']),
    map(groupId => new fromGroup.SelectAction(groupId))
  );

  @Effect()
  getUsersByGroup = this.actions$.pipe(
    ofType<fromGroup.SelectAction>(fromGroup.ActionTypes.Select),
    map(action => action.payload),
    switchMap(__ => this.store.pipe(select(fromAdmin.getSelectedGroup))),
    filter(val => val != null),
    withLatestFrom(
      this.store.pipe(select(fromAdmin.getMembersPageIndex)),
      this.store.pipe(select(fromAdmin.getMembersPageSize))
    ),
    switchMap(([{ id }, pageIndex, pageSize]) =>
      this.service.getGroupMembers(id, pageIndex, pageSize).pipe(
        map(result => new fromGroupDetail.GetUsersByGroupSuccessAction(result)),
        catchError(err =>
          of(new fromGroupDetail.GetUsersByGroupFailAction(err))
        )
      )
    )
  );
}
