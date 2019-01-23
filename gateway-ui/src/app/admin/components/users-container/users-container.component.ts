import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, filter, take } from 'rxjs/operators';
import { PageEvent, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import {
  selectAll,
  selectCount
} from '@app/admin/store/reducers/users/users.selectors';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { KeycloakUser } from '@app/admin/admin.model';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { BREADCRUMBS_USERS } from '@app/admin/commons/breadcrumbs';
import { DEFAULT_PAGE_SIZE } from '@app/libs';

import * as fromAdmin from '@app/admin/store/reducers';
import * as fromUser from '@app/admin/store/actions/users/user.actions';

@Component({
  selector: 'tgapp-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersContainerComponent implements OnInit {
  pageIndex = 0;
  pageSize = DEFAULT_PAGE_SIZE;
  pageEvent$ = new Subject<PageEvent>();
  crumbs: Crumb[] = BREADCRUMBS_USERS;
  total$ = this.store.pipe(select(selectCount));
  users$ = this.store.pipe(
    select(selectAll),
    map(users =>
      users.map(user => ({
        id: user.id,
        title: user.username,
        subtitle: `${user.firstName} ${user.lastName}`,
        desc: user.email,
        value: user
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
    this.store.dispatch(
      new fromUser.LoadPageAction({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
    );
    this.store.dispatch(new fromUser.CountAction());
  }

  handlePage({ pageIndex, pageSize }: PageEvent) {
    this.store.dispatch(
      new fromUser.LoadPageAction({
        pageIndex: pageIndex,
        pageSize: pageSize
      })
    );
  }

  handleFilter(filterStr: string) {
    this.store.dispatch(new fromUser.SearchAction(filterStr));
  }

  handleAdd() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        title: this.translate.instant('tgapp.admin.user-dialog.add.title'),
        payload: null
      }
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(val => val),
        take(1)
      )
      .subscribe(val => this.store.dispatch(new fromUser.AddAction(val)));
  }

  handleUpdate(user: KeycloakUser) {
    this.router.navigate([`${user.id}`], { relativeTo: this.route });
  }
}
