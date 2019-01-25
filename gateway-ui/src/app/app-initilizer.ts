import { KeycloakService, KeycloakEvent } from 'keycloak-angular';

import { environment } from '../environments/environment';
import { EventStackService } from './core/keycloak/event-stack.service';
import { LocalStorageService } from './core';

export function initializer(
  keycloak: KeycloakService,
  eventStackService: EventStackService,
  localStorgaeService: LocalStorageService
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        keycloak.keycloakEvents$.subscribe(event => {
          eventStackService.triggerEvent(event);
        });
        await keycloak.init({
          config: {
            ...environment.keycloak,
            realm:
              localStorgaeService.getRawItem('REALM') ||
              environment.keycloak.realm
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: [environment.leanCloud.baseUrl]
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
