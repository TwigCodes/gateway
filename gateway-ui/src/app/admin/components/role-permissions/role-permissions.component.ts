import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ColumnConfig, BaseLeanCloudTableComponent, Crumb } from '@app/libs';
import { ConfirmService } from '@app/shared';
import { RolePermission } from '@app/admin/admin.model';
import { RolePermissionService } from '../../services';
import { RolePermissionDialogComponent } from './role-permission-dialog.component';

@Component({
  selector: 'tgapp-role-permissions-container',
  templateUrl: '../../../libs/entity/templates/entity-table.html',
  styles: [
    `
      :host {
        position: absolute;
        height: calc(100% - 64px - 44px - 20px);
        overflow-y: auto;
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolePermissionsContainerComponent
  extends BaseLeanCloudTableComponent<RolePermission, RolePermissionService>
  implements OnInit {
  public columns: ColumnConfig[];
  public crumbs: Crumb[];
  public entityForm = RolePermissionDialogComponent;
  constructor(
    protected service: RolePermissionService,
    protected dialog: MatDialog,
    protected confirm: ConfirmService
  ) {
    super(service, dialog, confirm);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sortable = true;
    this.selectable = false;
    this.crumbs = [
      { name: 'tgapp.breadcrumb.admin.home', link: '../' },
      { name: 'tgapp.breadcrumb.admin.role-permissions', link: '.' }
    ];
    this.columns = [
      {
        name: 'objectId',
        header: 'ID',
        cell: (e: RolePermission) => `${e.objectId}`,
        type: 'string',
        sortable: true
      },
      {
        name: 'roleName',
        header: '角色名称',
        cell: (e: RolePermission) => e.roleName,
        type: 'string',
        filterable: true
      },
      {
        name: 'permissions',
        header: '权限',
        cell: (e: RolePermission) =>
          `${e.permissions ? e.permissions.map(p => p.name).join(',') : ''}`,
        type: 'string'
      },
      {
        name: 'createdAt',
        header: '创建时间',
        cell: (e: RolePermission) => e.createdAt,
        type: 'date',
        sortable: true,
        filterable: true
      },
      {
        name: 'updatedAt',
        header: '更新时间',
        cell: (e: RolePermission) => e.updatedAt,
        type: 'date',
        sortable: true,
        filterable: true
      }
    ];
  }

  handleItem(row: RolePermission) {
    console.log(row);
  }
}
