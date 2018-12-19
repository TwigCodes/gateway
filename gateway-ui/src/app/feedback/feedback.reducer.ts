import { Action } from '@ngrx/store';
import { FeedbackActions, FeedbackActionTypes } from './feedback.actions';
import { FeedbackState } from './feedback.model';

export const initialState: FeedbackState = {};

export function reducer(
  state = initialState,
  action: FeedbackActions
): FeedbackState {
  switch (action.type) {
    case FeedbackActionTypes.LoadFeedbacks:
      return state;

    default:
      return state;
  }
}
