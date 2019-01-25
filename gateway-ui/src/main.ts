import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { create } from 'rxjs-spy';
const spy = create();
if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  if (environment.auth_method === 'keycloak') {
    let path = window.location.pathname;
    const paths = path.split('/');
    if (paths.length > 1) {
      localStorage.setItem(`REALM`, paths[1]);
    }
  }
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
