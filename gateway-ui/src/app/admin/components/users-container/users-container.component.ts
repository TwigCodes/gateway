import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { LoadPageAction, CountAction } from '@app/admin/actions/user.actions';
import { selectAll, selectCount } from '@app/admin/reducers/user.selectors';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import { Item } from '@app/libs/list-or-grid-with-filter/list-or-grid-with-filter.component';

import * as fromAdmin from '../../reducers';

@Component({
  selector: 'tgapp-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss']
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
  constructor(private store: Store<fromAdmin.State>) {}

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

  handleAdd() {}
}
