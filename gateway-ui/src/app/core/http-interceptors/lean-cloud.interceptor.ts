import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Md5 } from 'md5-typescript';
import { environment } from '@env/environment';

@Injectable()
export class LeanCloudInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.indexOf('leancloud.cn') === -1) {
      return next.handle(req);
    }
    const sign = Md5.init(`${Date.now}${environment.leanCloud.appKey}`);
    const request = req.clone();
    request.headers.set('X-LC-Id', environment.leanCloud.appId);
    request.headers.set('X-LC-Sign', sign);
    return next.handle(request);
  }
}
