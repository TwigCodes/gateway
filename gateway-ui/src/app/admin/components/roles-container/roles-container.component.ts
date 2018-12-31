import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { map, filter, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { selectAll } from '@app/admin/reducers/roles/role.selectors';
import { KeycloakRole } from '@app/admin/admin.model';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

import * as fromAdminReducer from '../../reducers';
import * as fromRole from '@app/admin/actions/role.actions';
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
        desc: role.description,
        value: role
      }))
    )
  );
  constructor(
    private store: Store<fromAdminReducer.State>,
    private dialog: MatDialog,
    private translate: TranslateService,
    private router: Router
  ) {}
  ngOnInit() {
    this.store.dispatch(new fromRole.GetAllAction());
  }

  handleAdd() {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      data: {
        title: this.translate.instant('tgapp.admin.role-dialog.add.title'),
        payload: null
      }
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(val => val),
        take(1)
      )
      .subscribe(val => this.store.dispatch(new fromRole.AddAction(val)));
  }

  handleUpdate(role: KeycloakRole) {
    this.router.navigate([`/admin/roles/${role.name}`]);
  }
}
