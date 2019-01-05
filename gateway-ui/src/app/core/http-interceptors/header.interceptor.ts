import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { environment } from '@env/environment.prod';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url.indexOf(environment.keycloak.url) > -1 &&
      req.url.indexOf(`${environment.keycloak.url}/admin`) === -1
    ) {
      return next.handle(req);
    }
    const request = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });
    return next.handle(request);
  }
}
