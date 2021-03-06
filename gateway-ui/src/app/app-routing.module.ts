import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { SettingsContainerComponent } from './settings';
import { AuthGuardService } from './core';
import { AboutComponent } from './static';

const routes: Routes = [
  {
    path: ':realm',
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent,
        pathMatch: 'full'
      },
      {
        path: 'settings',
        component: SettingsContainerComponent,
        canActivate: [AuthGuardService],
        data: { title: 'tgapp.menu.settings' }
      },
      {
        path: 'feedback',
        loadChildren: './feedback#FeedbackModule',
        pathMatch: 'prefix'
      },
      {
        path: 'admin',
        data: {
          permissions: {
            only: ['admin', 'readUser', 'readGroup', 'readRole', 'readPerm']
          }
        },
        canLoad: [NgxPermissionsGuard],
        loadChildren: './admin#AdminModule',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
