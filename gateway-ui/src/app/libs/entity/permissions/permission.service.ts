import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseLeanCloudService } from '../base-lean-cloud.service';
import { LeanCloudResult } from '../lean-cloud.model';
import { Permission } from './admin.model';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseLeanCloudService<Permission> {
  protected entityPath = 'Permissions';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getByTenant(tenant: string) {
    this.loadingSubject.next(true);
    return this.httpClient
      .get<LeanCloudResult<Permission>>(`${this.baseUrl}/${this.entityPath}`, {
        params: {
          where: JSON.stringify({ tenant: tenant })
        }
      })
      .pipe(
        map(res => res.results.map(perm => new Permission(perm))),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }
}
