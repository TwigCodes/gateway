import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoleService } from '../services';
import * as fromRole from '../actions/role.actions';

@Injectable()
export class RoleEffects {
  constructor(private actions$: Actions, private service: RoleService) {}

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
}
