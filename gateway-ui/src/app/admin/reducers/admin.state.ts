import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '@app/core';

import * as fromRole from './role.reducer';
import * as fromUser from './user.reducer';

export interface AdminState {
  role: fromRole.State;
  user: fromUser.State;
}

export interface State extends AppState {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  user: fromUser.reducer,
  role: fromRole.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
