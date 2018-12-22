import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { AdminRoutingModule } from './admin-routing.module';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent
} from './components';

@NgModule({
  declarations: [
    HomeContainerComponent,
    RolesContainerComponent,
    UsersContainerComponent
  ],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
