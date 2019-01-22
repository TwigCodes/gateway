import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseLeanCloudService } from '@app/libs';
import { RolePermission } from '../admin.model';

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
}
