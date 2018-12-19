import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeContainerComponent } from './components';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
