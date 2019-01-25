import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ColumnConfig, BaseLeanCloudTableComponent, Crumb } from '@app/libs';
import { ConfirmService } from '@app/shared';
import { Permission } from '@app/libs';
import { PermissionService } from '@app/libs';
import { PermissionDialogComponent } from './permission-dialog.component';

@Component({
  selector: 'tgapp-permissions-container',
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
export class PermissionsContainerComponent
  extends BaseLeanCloudTableComponent<Permission, PermissionService>
  implements OnInit {
  public columns: ColumnConfig[];
  public crumbs: Crumb[];
  public entityForm = PermissionDialogComponent;
  constructor(
    protected service: PermissionService,
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
      { name: 'tgapp.breadcrumb.admin.permissions', link: '.' }
    ];
    this.columns = [
      {
        name: 'id',
        header: 'ID',
        cell: (e: Partial<Permission>) => {
          const perm = new Permission(e);
          return perm.id;
        },
        type: 'string',
        sortable: true
      },
      {
        name: 'tenant',
        header: '租户名称',
        cell: (e: Permission) => e.tenant,
        type: 'string',
        filterable: true
      },
      {
        name: 'name',
        header: '权限名称',
        cell: (e: Permission) => e.name,
        type: 'string',
        filterable: true
      },
      {
        name: 'createdAt',
        header: '创建时间',
        cell: (e: Permission) => e.createdAt,
        type: 'date',
        sortable: true,
        filterable: true
      },
      {
        name: 'updatedAt',
        header: '更新时间',
        cell: (e: Permission) => e.updatedAt,
        type: 'date',
        sortable: true,
        filterable: true
      }
    ];
  }

  handleItem(row: Permission) {
    console.log(row);
  }
}
