import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { map, filter, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { selectAll } from '@app/admin/reducers/role.selectors';
import { AddAction, GetAllAction } from '@app/admin/actions/role.actions';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

import * as fromAdmin from '../../reducers';

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
  roles$ = this.store.pipe(
    select(selectAll),
    map(roles =>
      roles.map(role => ({
        id: role.id,
        title: role.name,
        subtitle: role.containerId,
        desc: role.description
      }))
    )
  );
  constructor(
    private store: Store<fromAdmin.State>,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.store.dispatch(new GetAllAction());
  }

  handleAdd() {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      data: { title: '添加角色', payload: null }
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(val => val),
        take(1)
      )
      .subscribe(val => this.store.dispatch(new AddAction(val)));
  }
}
