import { Action } from '@ngrx/store';

export enum FeedbackActionTypes {
  LoadFeedbacks = '[Feedback] Load Feedbacks'
}

export class LoadFeedbacks implements Action {
  readonly type = FeedbackActionTypes.LoadFeedbacks;
}

export type FeedbackActions = LoadFeedbacks;
