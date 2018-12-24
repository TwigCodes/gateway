import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { NotificationService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard extends KeycloakAuthGuard {
  constructor(
    protected router: Router,
    protected keycloak: KeycloakService,
    private notification: NotificationService
  ) {
    super(router, keycloak);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, _) => {
      if (!this.authenticated) {
        resolve(false);
        this.notification.warn('您没有访问权限！');
        return;
      }

      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
        resolve(granted);
      }
    });
  }
}
