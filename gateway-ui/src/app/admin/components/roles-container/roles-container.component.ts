import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { map, filter, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Crumb, KeycloakRole } from '@app/libs';
import { selectAll } from '@app/admin/store/reducers/roles/roles.selectors';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { BREADCRUMBS_ROLES } from '@app/admin/commons/breadcrumbs';

import * as fromAdmin from '@app/admin/store/reducers';
import * as fromRole from '@app/admin/store/actions/roles/role.actions';
@Component({
  selector: 'tgapp-roles-container',
  templateUrl: './roles-container.component.html',
  styleUrls: ['./roles-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesContainerComponent implements OnInit {
  crumbs: Crumb[] = BREADCRUMBS_ROLES;
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
    private store: Store<fromAdmin.State>,
    private dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
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
    this.router.navigate([`${role.id}`], { relativeTo: this.route });
  }
}
