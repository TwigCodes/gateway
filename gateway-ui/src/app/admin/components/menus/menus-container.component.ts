import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ColumnConfig, BaseLeanCloudTableComponent, Crumb } from '@app/libs';
import { ConfirmService } from '@app/shared';
import { AdminMenuService } from '../../services';
import { AdminMenuItem } from '@app/libs';
import { MenusDialogComponent } from './menu-dialog.component';
import { BREADCRUMBS_MENUS } from '../../commons/breadcrumbs';

@Component({
  selector: 'tgapp-menus-container',
  templateUrl: '../../../libs/entity/templates/entity-table.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenusContainerComponent
  extends BaseLeanCloudTableComponent<AdminMenuItem, AdminMenuService>
  implements OnInit {
  public columns: ColumnConfig[];
  public crumbs: Crumb[];
  public entityForm = MenusDialogComponent;
  constructor(
    protected service: AdminMenuService,
    protected dialog: MatDialog,
    protected confirm: ConfirmService
  ) {
    super(service, dialog, confirm);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sortable = true;
    this.crumbs = BREADCRUMBS_MENUS;
    this.columns = [
      {
        name: 'id',
        header: 'ID',
        cell: (e: Partial<AdminMenuItem>) => {
          const item = new AdminMenuItem(e);
          return item.id;
        },
        type: 'string',
        sortable: true
      },
      {
        name: 'title',
        header: '菜单标题',
        cell: (e: AdminMenuItem) => e.title,
        type: 'translate',
        filterable: true
      },
      {
        name: 'subtitle',
        header: '菜单副标题',
        cell: (e: AdminMenuItem) => e.subtitle,
        type: 'translate'
      },
      {
        name: 'desc',
        header: '菜单描述',
        cell: (e: AdminMenuItem) => e.desc,
        type: 'translate'
      },
      {
        name: 'link',
        header: '菜单路由',
        cell: (e: AdminMenuItem) => e.link,
        type: 'string'
      },
      {
        name: 'createdAt',
        header: '创建时间',
        cell: (e: AdminMenuItem) => e.createdAt,
        type: 'date',
        sortable: true,
        filterable: true
      },
      {
        name: 'updatedAt',
        header: '更新时间',
        cell: (e: AdminMenuItem) => e.updatedAt,
        type: 'date',
        sortable: true,
        filterable: true
      }
    ];
  }

  handleItem(row: AdminMenuItem) {
    console.log(row);
  }
}
