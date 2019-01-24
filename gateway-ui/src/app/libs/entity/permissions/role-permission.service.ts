import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, finalize, switchMap } from 'rxjs/operators';
import { BaseLeanCloudService } from '../base-lean-cloud.service';
import { LeanCloudResult } from '../lean-cloud.model';
import { RolePermission } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService extends BaseLeanCloudService<
  RolePermission
> {
  protected entityPath = 'RolePermissions';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  add(entity: Partial<RolePermission>) {
    this.loadingSubject.next(true);
    return this.httpClient
      .post<{ objectId: string }>(
        `${this.baseUrl}/${this.entityPath}`,
        entity.toAddExpr
      )
      .pipe(
        switchMap(({ objectId }) => this.getById(objectId)),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getById(id: string) {
    return this.httpClient
      .get<RolePermission>(`${this.baseUrl}/${this.entityPath}/${id}`, {
        params: { include: 'permission' }
      })
      .pipe(catchError(this.handleError));
    // finalize(() => this.loadingSubject.next(false))
  }

  getByRole(roleName: string, tenant: string) {
    this.loadingSubject.next(true);
    return this.httpClient
      .get<LeanCloudResult<RolePermission>>(
        `${this.baseUrl}/${this.entityPath}`,
        {
          params: {
            where: JSON.stringify({ roleName: roleName, tenant: tenant }),
            include: 'permission'
          }
        }
      )
      .pipe(
        map(res =>
          res.results.map(rolePermission => new RolePermission(rolePermission))
        ),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
      );
  }

  getAllByTenant(tenant: string) {
    return this.httpClient
      .get<LeanCloudResult<RolePermission>>(
        `${this.baseUrl}/${this.entityPath}`,
        {
          params: {
            where: JSON.stringify({ tenant: tenant }),
            include: 'permission'
          }
        }
      )
      .pipe(
        map(res =>
          res.results.map(rolePermission => new RolePermission(rolePermission))
        ),
        catchError(this.handleError)
      );
  }
}
