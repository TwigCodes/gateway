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
  PermissionsContainerComponent
} from './components';
import { MenusContainerComponent } from './components/menus/menus-container.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin', 'readUser', 'readGroup', 'readRole', 'readPerm']
        // except: ['GUEST']
      }
    }
  },
  {
    path: 'roles',
    component: RolesContainerComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin', 'readRole']
        // except: ['GUEST']
      }
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
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin', 'readUser']
        // except: ['GUEST']
      }
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
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin', 'readGroup']
        // except: ['GUEST']
      }
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
    component: PermissionsContainerComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin', 'readPerm']
        // except: ['GUEST']
      }
    }
  },
  {
    path: 'menus',
    component: MenusContainerComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['admin']
        // except: ['GUEST']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
