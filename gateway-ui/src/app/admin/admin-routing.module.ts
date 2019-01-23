import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  RoleDetailContainerComponent,
  UserDetailContainerComponent,
  GroupsContainerComponent,
  GroupDetailContainerComponent,
  RolePermissionsContainerComponent
} from './components';
import { AdminGuard } from './admin.guard';
import { MenusContainerComponent } from './components/menus/menus-container.component';

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
  },
  {
    path: 'groups',
    component: GroupsContainerComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin']
    },
    children: [
      {
        path: ':groupId',
        component: GroupDetailContainerComponent
      }
    ]
  },
  {
    path: 'permissions',
    component: RolePermissionsContainerComponent,
    canActivate: [AdminGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'menus',
    component: MenusContainerComponent,
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
