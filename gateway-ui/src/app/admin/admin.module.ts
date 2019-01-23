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
  PermissionsContainerComponent,
  PermissionDialogComponent
} from './components';

import { ADMIN_EFFECTS } from './effects';
import { DataMgmtModule } from '@app/data-mgmt/data-mgmt.module';
import * as fromAdmin from './reducers';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import {
  uniqueUsernameValidationConfig,
  uniqueRoleNameValidationConfig,
  uniqueGroupNameValidationConfig
} from '@app/libs';
import { UserService, RoleService, GroupService } from './services';

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
  PermissionsContainerComponent,
  PermissionDialogComponent
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
    PermissionDialogComponent
  ],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: uniqueUsernameValidationConfig,
      deps: [UserService]
    },
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: uniqueRoleNameValidationConfig,
      deps: [RoleService]
    },
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: uniqueGroupNameValidationConfig,
      deps: [GroupService]
    }
  ]
})
export class AdminModule {}
