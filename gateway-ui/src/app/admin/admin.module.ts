import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';
import { AdminRoutingModule } from './admin-routing.module';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  UserDialogComponent,
  RoleDialogComponent
} from './components';
import * as fromAdmin from './reducers';
import { UserEffects, RoleEffects } from './effects';

@NgModule({
  declarations: [
    HomeContainerComponent,
    RolesContainerComponent,
    UsersContainerComponent,
    UserDialogComponent,
    RoleDialogComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature('admin', fromAdmin.reducers),
    EffectsModule.forFeature([UserEffects, RoleEffects])
  ],
  entryComponents: [UserDialogComponent, RoleDialogComponent]
})
export class AdminModule {}
