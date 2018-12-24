import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { AdminRoutingModule } from './admin-routing.module';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  UserDialogComponent,
  RoleDialogComponent
} from './components';

@NgModule({
  declarations: [
    HomeContainerComponent,
    RolesContainerComponent,
    UsersContainerComponent,
    UserDialogComponent,
    RoleDialogComponent
  ],
  imports: [SharedModule, AdminRoutingModule],
  entryComponents: [UserDialogComponent, RoleDialogComponent]
})
export class AdminModule {}
