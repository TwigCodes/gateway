import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeContainerComponent } from './components';
import { SharedModule } from '@app/shared';
import { RolesContainerComponent } from './components/roles-container/roles-container.component';
import { ListOrGridWithFilterComponent } from './components/list-or-grid-with-filter/list-or-grid-with-filter.component';
import { UsersContainerComponent } from './components/users-container/users-container.component';

@NgModule({
  declarations: [HomeContainerComponent, RolesContainerComponent, ListOrGridWithFilterComponent, UsersContainerComponent],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
