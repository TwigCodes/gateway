import { Component, OnInit } from '@angular/core';
import { Crumb } from '@app/libs/bread-crumbs/bread-crumbs.component';
import {
  AuthAdminService,
  KeycloakUser
} from '@app/admin/services/auth-admin.service';
import { map, switchMap, startWith } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { Item } from '@app/libs/list-or-grid-with-filter/list-or-grid-with-filter.component';

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
  total$ = this.service.getUserCount();
  users$: Observable<Item[]>;
  constructor(private service: AuthAdminService) {}

  ngOnInit() {
    this.users$ = this.pageEvent$.asObservable().pipe(
      startWith({ pageIndex: this.pageIndex, pageSize: this.pageSize }),
      switchMap(({ pageIndex, pageSize }) =>
        this.service.getUsers(pageIndex, pageSize).pipe(
          map(users =>
            users.map(user => ({
              id: user.id,
              title: user.username,
              subtitle: `${user.firstName} ${user.lastName}`,
              desc: user.email
            }))
          )
        )
      )
    );
  }

  handlePage(ev: PageEvent) {
    this.pageEvent$.next(ev);
    this.pageIndex = ev.pageIndex;
    this.pageSize = ev.pageSize;
  }

  handleAdd() {}
}
