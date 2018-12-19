import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeContainerComponent } from './components';

@NgModule({
  declarations: [HomeContainerComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
