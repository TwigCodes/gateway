import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import { AuthGuardService } from './core';
import { AboutComponent } from './static';
import { AdminGuard } from './admin/admin.guard';

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
        loadChildren: './admin#AdminModule',
        pathMatch: 'prefix',
        canActivate: [AdminGuard]
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
