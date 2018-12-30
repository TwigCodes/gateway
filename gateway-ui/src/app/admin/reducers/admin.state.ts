import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '@app/core';

import * as fromRole from './role.reducer';
import * as fromUser from './user.reducer';
import * as fromGroup from './group.reducer';
import * as fromRoleDetail from './role-detail.reducer';
import * as fromUserDetail from './user-detail.reducer';
import * as fromGroupDetail from './group-detail.reducer';

export interface AdminState {
  group: fromGroup.State;
  groupdetail: fromGroupDetail.State;
  role: fromRole.State;
  roledetail: fromRoleDetail.State;
  user: fromUser.State;
  userdetail: fromUserDetail.State;
}

export interface State extends AppState {
  admin: AdminState;
}

export const reducers: ActionReducerMap<AdminState> = {
  group: fromGroup.reducer,
  groupdetail: fromGroupDetail.reducer,
  role: fromRole.reducer,
  roledetail: fromRoleDetail.reducer,
  user: fromUser.reducer,
  userdetail: fromUserDetail.reducer
};

export const selectAdminState = createFeatureSelector<AdminState>('admin');
