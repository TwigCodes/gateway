import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
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
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { RolePermissionService, RolePermission } from '@app/libs';

export const AUTH_KEY = 'AUTH';
export const REALM_KEY = 'REALM';

@Injectable()
export class AuthEffects {
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
  configPermissions = this.actions$.pipe(
    ofType<ActionAuthLoginSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    switchMap(__ => {
      const roleNames = this.keycloakService.getUserRoles();
      const tenant = this.localStorageService.getRawItem(REALM_KEY);
      if (tenant == null) {
        return of([]);
      }
      return this.rolePerms.getByRoleNamesAndTenant(roleNames, tenant).pipe(
        catchError(err => {
          console.error('cannot get role permissions: ', err);
          return of([]);
        })
      );
    }),
    tap((rps: RolePermission[]) => {
      const permsByRoles = rps.map(rp => rp.permission.name);
      this.permissionsService.addPermission(permsByRoles);
      this.permissionsService.loadPermissions(permsByRoles);
      const roles = rps.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.roleName]: !!acc[curr.roleName]
            ? [...acc[curr.roleName], curr.permission.name]
            : [curr.permission.name]
        }),
        {}
      );
      this.roleService.addRoles(roles);
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

  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private keycloakService: KeycloakService,
    private permissionsService: NgxPermissionsService,
    private rolePerms: RolePermissionService,
    private roleService: NgxRolesService,
    // private oauthService: OAuthService,
    private router: Router
  ) {}
}
