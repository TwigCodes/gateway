import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '@app/shared';

import { AdminRoutingModule } from './admin-routing.module';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  UserDialogComponent,
  RoleDialogComponent,
  RoleDetailContainerComponent,
  UserDetailContainerComponent,
  GroupsContainerComponent,
  GroupDetailContainerComponent,
  GroupDialogComponent,
  MenusContainerComponent,
  MenusDialogComponent,
  RolePermissionsContainerComponent,
  RolePermissionDialogComponent
} from './components';

import { ADMIN_EFFECTS } from './effects';
import { DataMgmtModule } from '@app/data-mgmt/data-mgmt.module';
import * as fromAdmin from './reducers';

export const COMPONENTS = [
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  UserDialogComponent,
  RoleDialogComponent,
  RoleDetailContainerComponent,
  UserDetailContainerComponent,
  GroupsContainerComponent,
  GroupDetailContainerComponent,
  GroupDialogComponent,
  MenusContainerComponent,
  MenusDialogComponent,
  RolePermissionsContainerComponent,
  RolePermissionDialogComponent
];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    SharedModule,
    AdminRoutingModule,
    DataMgmtModule,
    StoreModule.forFeature('admin', fromAdmin.reducers),
    EffectsModule.forFeature(ADMIN_EFFECTS)
  ],
  entryComponents: [
    UserDialogComponent,
    RoleDialogComponent,
    GroupDialogComponent,
    MenusDialogComponent,
    RolePermissionDialogComponent
  ]
})
export class AdminModule {}
