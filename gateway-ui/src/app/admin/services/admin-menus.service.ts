import { Injectable } from '@angular/core';
import { BaseLeanCloudService } from '@app/libs';
import { AdminMenuItem } from '../../libs/entity/permissions/admin.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuService extends BaseLeanCloudService<AdminMenuItem> {
  protected entityPath = 'AdminMenuItems';
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
