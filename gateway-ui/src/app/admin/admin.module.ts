import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeContainerComponent } from './components';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [HomeContainerComponent],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
