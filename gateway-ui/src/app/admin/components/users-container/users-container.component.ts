import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, filter, take } from 'rxjs/operators';
import { PageEvent, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { selectAll, selectCount } from '@app/admin/reducers/user.selectors';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { KeycloakUser } from '@app/admin/admin.model';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

import * as fromAdminReducer from '../../reducers';
import * as fromUser from '@app/admin/actions/user.actions';

@Component({
  selector: 'tgapp-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersContainerComponent implements OnInit {
  pageIndex = 0;
  pageSize = 25;
  pageEvent$ = new Subject<PageEvent>();
  crumbs: Crumb[] = [
    {
      name: 'admin',
      link: '/admin'
    },
    {
      name: 'users',
      link: '/admin/users'
    }
  ];
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
    private store: Store<fromAdminReducer.State>,
    private dialog: MatDialog,
    private translate: TranslateService,
    private router: Router
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
    this.router.navigate([`/admin/users/${user.id}`]);
    // const dialogRef = this.dialog.open(UserDialogComponent, {
    //   data: {
    //     title: this.translate.instant('tgapp.admin.user-dialog.edit.title'),
    //     payload: user
    //   }
    // });
    // dialogRef
    //   .afterClosed()
    //   .pipe(
    //     filter(val => val),
    //     take(1)
    //   )
    //   .subscribe(val =>
    //     this.store.dispatch(
    //       new fromUser.UpdateAction({
    //         id: user.id,
    //         update: { ...user, ...val }
    //       })
    //     )
    //   );
  }
}
