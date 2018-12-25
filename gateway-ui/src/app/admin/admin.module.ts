import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@env/environment';
import { SharedModule } from '@app/shared';

import { AdminRoutingModule } from './admin-routing.module';
import {
  HomeContainerComponent,
  RolesContainerComponent,
  UsersContainerComponent,
  UserDialogComponent,
  RoleDialogComponent
} from './components';

import { UserEffects, RoleEffects, AdminEffects } from './effects';
import * as fromAdmin from './reducers';

@NgModule({
  declarations: [
    HomeContainerComponent,
    RolesContainerComponent,
    UsersContainerComponent,
    UserDialogComponent,
    RoleDialogComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    StoreModule.forFeature('admin', fromAdmin.reducers),
    EffectsModule.forFeature([UserEffects, RoleEffects, AdminEffects])
  ],
  entryComponents: [UserDialogComponent, RoleDialogComponent]
})
export class AdminModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/admin/`,
    '.json'
  );
}
