import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { AuthAdminService } from '@app/admin/services/auth-admin.service';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { MatDialog } from '@angular/material';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

@Component({
  selector: 'tgapp-roles-container',
  templateUrl: './roles-container.component.html',
  styleUrls: ['./roles-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesContainerComponent implements OnInit {
  crumbs: Crumb[] = [
    {
      name: 'admin',
      link: '/admin'
    },
    {
      name: 'roles',
      link: '/admin/roles'
    }
  ];
  roles$ = this.service.getRoles().pipe(
    map(roles =>
      roles.map(role => ({
        id: role.id,
        title: role.name,
        subtitle: role.containerId,
        desc: role.description
      }))
    )
  );
  constructor(private service: AuthAdminService, private dialog: MatDialog) {}
  ngOnInit() {}

  handleAdd() {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      data: { title: '添加角色', payload: null }
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(val => {
          console.log(val);

          return val !== null;
        }),
        take(1),
        switchMap(val => this.service.addRole(val))
      )
      .subscribe();
  }
}
