import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  RoleDetailContainerComponent,
  UserDetailContainerComponent
} from './components';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'roles',
    component: RolesContainerComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin']
    },
    children: [
      {
        path: ':roleId',
        component: RoleDetailContainerComponent
      }
    ]
  },
  {
    path: 'users',
    component: UsersContainerComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin']
    },
    children: [
      {
        path: ':userId',
        component: UserDetailContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
