import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { SharedModule } from '@app/shared';

import { AdminRoutingModule } from './admin-routing.module';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  UserDialogComponent,
  RoleDialogComponent,
  RoleDetailContainerComponent,
  UserDetailContainerComponent,
  GroupsContainerComponent,
  GroupDetailContainerComponent,
  GroupDialogComponent
} from './components';

import {
  GroupService,
  RoleService,
  UserService,
  GroupSearchService,
  UserSearchService
} from './services';
import { ADMIN_EFFECTS } from './effects';
import { DataMgmtModule } from '@app/data-mgmt/data-mgmt.module';
import * as fromAdmin from './reducers';
import { AdminGuard } from './admin.guard';

export const COMPONENTS = [
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  UserDialogComponent,
  RoleDialogComponent,
  RoleDetailContainerComponent,
  UserDetailContainerComponent,
  GroupsContainerComponent,
  GroupDetailContainerComponent,
  GroupDialogComponent
];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    SharedModule,
    AdminRoutingModule,
    DataMgmtModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    StoreModule.forFeature('admin', fromAdmin.reducers),
    EffectsModule.forFeature(ADMIN_EFFECTS)
  ],
  providers: [
    GroupService,
    RoleService,
    UserService,
    GroupSearchService,
    UserSearchService,
    AdminGuard
  ],
  entryComponents: [
    UserDialogComponent,
    RoleDialogComponent,
    GroupDialogComponent
  ]
})
export class AdminModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/', suffix: '.json' },
    { prefix: './assets/i18n/libs/', suffix: '.json' },
    { prefix: './assets/i18n/admin/', suffix: '.json' }
  ]);
}
