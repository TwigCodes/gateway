import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, filter, take } from 'rxjs/operators';
import { PageEvent, MatDialog } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import {
  LoadPageAction,
  CountAction,
  AddAction
} from '@app/admin/actions/user.actions';
import { selectAll, selectCount } from '@app/admin/reducers/user.selectors';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { Item } from '@app/libs/list-or-grid-with-filter/list-or-grid-with-filter.component';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

import * as fromAdmin from '../../reducers';

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
  users$: Observable<Item[]>;
  constructor(
    private store: Store<fromAdmin.State>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new LoadPageAction({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    );
    this.store.dispatch(new CountAction());
    this.users$ = this.store.pipe(
      select(selectAll),
      map(users =>
        users.map(user => ({
          id: user.id,
          title: user.username,
          subtitle: `${user.firstName} ${user.lastName}`,
          desc: user.email
        }))
      )
    );
  }

  handlePage({ pageIndex, pageSize }: PageEvent) {
    this.store.dispatch(
      new LoadPageAction({ pageIndex: pageIndex, pageSize: pageSize })
    );
  }

  handleAdd() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
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
