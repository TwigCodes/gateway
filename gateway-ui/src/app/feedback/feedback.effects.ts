import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FeedbackActionTypes } from './feedback.actions';

@Injectable()
export class FeedbackEffects {

  @Effect()
  loadFeedbacks$ = this.actions$.pipe(ofType(FeedbackActionTypes.LoadFeedbacks));

  constructor(private actions$: Actions) {}
}
