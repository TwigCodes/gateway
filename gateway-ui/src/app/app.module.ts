import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { environment } from '@env/environment';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Keycloak
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-initilizer';
import { EventStackService } from './core/keycloak/event-stack.service';

import * as fundebug from 'fundebug-javascript';

fundebug.apikey = environment.fundbugApiKey;

// 定义FundebugErrorHandler
export class FundebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    fundebug.notifyError(err);
  }
}

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    // BrowserModule,

    // universal
    BrowserModule.withServerTransition({ appId: 'tgapp' }),
    TransferHttpCacheModule,

    // core & shared
    CoreModule,
    SharedModule,

    // Keycloak
    KeycloakAngularModule,

    // features
    StaticModule,
    SettingsModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    { provide: ErrorHandler, useClass: FundebugErrorHandler },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService, EventStackService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
