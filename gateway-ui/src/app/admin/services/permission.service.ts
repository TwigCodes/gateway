import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseLeanCloudService } from '@app/libs';
import { Permission } from '../admin.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends BaseLeanCloudService<Permission> {
  protected entityPath = 'Permissions';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
