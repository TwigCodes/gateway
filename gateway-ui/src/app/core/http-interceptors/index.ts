/* "Barrel" of Http Interceptors */
import { Injector, PLATFORM_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { UniversalInterceptor } from './universal.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    deps: [Injector, PLATFORM_ID],
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];
