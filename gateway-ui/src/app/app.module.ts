import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgxPermissionsService, NgxPermissionsModule } from 'ngx-permissions';

import { SharedModule } from '@app/shared';
import { CoreModule, LocalStorageService } from '@app/core';
import { environment } from '@env/environment';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Keycloak
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
// import { OAuthModule } from 'angular-oauth2-oidc';
import { initializer } from './app-initilizer';
import { EventStackService } from './core/keycloak/event-stack.service';
import { NotFoundModule } from './libs/not-found/not-found.module';

import * as fundebug from 'fundebug-javascript';
import { DataMgmtModule } from './data-mgmt/data-mgmt.module';
import { QuestionWizardModule } from './libs/question-wizard/question-wizard.module';

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
    NgxPermissionsModule.forRoot(),

    // Keycloak
    KeycloakAngularModule,
    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: ['https://auth.twigcodes.com/auth/admin'],
    //     sendAccessToken: true
    //   }
    // }),

    // features
    StaticModule,
    SettingsModule,

    // app
    AppRoutingModule,

    NotFoundModule,

    DataMgmtModule,

    QuestionWizardModule
  ],
  declarations: [AppComponent],
  providers: [
    { provide: ErrorHandler, useClass: FundebugErrorHandler },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService, EventStackService, LocalStorageService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
