/* "Barrel" of Http Interceptors */
import { Injector, PLATFORM_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './http-error.interceptor';
import { UniversalInterceptor } from './universal.interceptor';
import { HeaderInterceptor } from './header.interceptor';
import { LeanCloudInterceptor } from './lean-cloud.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    deps: [Injector, PLATFORM_ID],
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LeanCloudInterceptor, multi: true }
];
