import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { of, from } from 'rxjs';
// import { OAuthService } from 'angular-oauth2-oidc';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes,
  ActionAuthCheckLogin,
  ActionAuthLoginSuccess,
  ActionAuthLoginFail
} from './auth.actions';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private keycloakService: KeycloakService,
    // private oauthService: OAuthService,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() => {
      this.keycloakService.login();
      // this.oauthService.initImplicitFlow();
    })
  );

  @Effect()
  checkLogin = this.actions$.pipe(
    ofType<ActionAuthCheckLogin>(AuthActionTypes.CHECK_LOGIN),
    switchMap(_ =>
      from(this.keycloakService.isLoggedIn()).pipe(catchError(err => of(false)))
    ),
    map(loggedIn => {
      // const claims = this.oauthService.getIdentityClaims();
      // const loggedIn = claims != null;
      this.localStorageService.setItem(AUTH_KEY, {
        isAuthenticated: loggedIn
      });
      return loggedIn
        ? new ActionAuthLoginSuccess()
        : new ActionAuthLoginFail();
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.keycloakService.logout();
      // this.oauthService.logOut();
      this.router.navigate(['']);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
    })
  );
}
