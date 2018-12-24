import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '@env/environment';

@NgModule({
  imports: [
    // ngxs
    NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      logger: console,
      collapsed: false,
      disabled: environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsModule.forRoot([], { developmentMode: !environment.production })
  ],
  exports: [
    NgxsFormPluginModule,
    NgxsLoggerPluginModule,
    NgxsReduxDevtoolsPluginModule,
    NgxsModule
  ]
})
export class NgxsStoreModule {}
