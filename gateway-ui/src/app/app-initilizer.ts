import { KeycloakService, KeycloakEvent } from 'keycloak-angular';

import { environment } from '../environments/environment';
import { EventStackService } from './core/keycloak/event-stack.service';

export function initializer(
  keycloak: KeycloakService,
  eventStackService: EventStackService
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
            realm: localStorage.getItem('REALM') || environment.keycloak.realm
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
