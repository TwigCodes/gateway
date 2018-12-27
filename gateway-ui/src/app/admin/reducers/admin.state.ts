import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '@app/core';

import * as fromRole from './role.reducer';
import * as fromUser from './user.reducer';
import * as fromRoleDetail from './role-detail.reducer';

export interface AdminState {
  role: fromRole.State;
  roledetail: fromRoleDetail.State;
  user: fromUser.State;
}

export interface State extends AppState {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  role: fromRole.reducer,
  roledetail: fromRoleDetail.reducer,
  user: fromUser.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
