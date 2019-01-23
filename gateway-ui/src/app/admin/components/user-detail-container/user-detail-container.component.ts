import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { take, filter, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { GroupSearchService } from '@app/admin/services';
import { ConfirmService } from '@app/shared';
import { KeycloakRole, KeycloakGroup } from '@app/admin/admin.model';
import { DEFAULT_PAGE_SIZE } from '@app/libs';
import { BUILT_IN_USERS, BUILT_IN_ROLES } from '@app/admin/commons';

import * as fromAdmin from '@app/admin/reducers';
import * as fromUser from '@app/admin/actions/users/user.actions';
import * as fromUserRoles from '@app/admin/actions/users/user-roles.actions';
import * as fromRole from '@app/admin/actions/roles/role.actions';
import * as fromUserGroups from '@app/admin/actions/users/user-groups.actions';
import * as _ from 'lodash';

@Component({
  selector: 'tgapp-user-detail-container',
  templateUrl: './user-detail-container.component.html',
  styleUrls: ['./user-detail-container.component.scss']
})
export class UserDetailContainerComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  readonly pageSize = DEFAULT_PAGE_SIZE;
  entityForm = new FormGroup({});
  params = new HttpParams()
    .set('pageIndex', '0')
    .set('pageSize', String(this.pageSize));
  model;
  model$ = this.store.pipe(select(fromAdmin.getUserSelected));
  roles$ = this.store.pipe(select(fromAdmin.getUserRoles));
  groups$ = this.store.pipe(select(fromAdmin.getUserGroups));
  availableRoles$ = this.store.pipe(select(fromAdmin.getRoles));
  sub: Subscription;
  fields: FormlyFieldConfig[];
  constructor(
    private store: Store<fromAdmin.State>,
    private translate: TranslateService,
    private confirm: ConfirmService,
    public groupService: GroupSearchService
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromRole.GetAllAction());
    this.sub = this.model$.subscribe(val => {
      this.model = { ...val };
      this.fields = [
        {
          key: 'username',
          type: 'input',
          validators: {
            validation: ['username']
          },
          templateOptions: { type: 'text', required: true },
          expressionProperties: {
            'templateOptions.label': () =>
              this.translate.instant('tgapp.admin.user-dialog.username.label'),
            'templateOptions.placeholder': () =>
              this.translate.instant(
                'tgapp.admin.user-dialog.username.placeholder'
              ),
            'templateOptions.disabled': () =>
              val && val.username ? this.isBuiltInUser(val.username) : false
          }
        },
        {
          key: 'firstName',
          type: 'input',
          templateOptions: { type: 'text', required: true },
          expressionProperties: {
            'templateOptions.label': () =>
              this.translate.instant('tgapp.admin.user-dialog.firstname.label'),
            'templateOptions.placeholder': () =>
              this.translate.instant(
                'tgapp.admin.user-dialog.firstname.placeholder'
              ),
            'templateOptions.disabled': () =>
              val && val.username ? this.isBuiltInUser(val.username) : false
          }
        },
        {
          key: 'lastName',
          type: 'input',
          templateOptions: { type: 'text', required: true },
          expressionProperties: {
            'templateOptions.label': () =>
              this.translate.instant('tgapp.admin.user-dialog.lastname.label'),
            'templateOptions.placeholder': () =>
              this.translate.instant(
                'tgapp.admin.user-dialog.lastname.placeholder'
              ),
            'templateOptions.disabled': () =>
              val && val.username ? this.isBuiltInUser(val.username) : false
          }
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: { type: 'email', required: true },
          expressionProperties: {
            'templateOptions.label': () =>
              this.translate.instant('tgapp.admin.user-dialog.email.label'),
            'templateOptions.placeholder': () =>
              this.translate.instant(
                'tgapp.admin.user-dialog.email.placeholder'
              ),
            'templateOptions.disabled': () =>
              val && val.username ? this.isBuiltInUser(val.username) : false
          }
        }
      ];
    });
  }
  ngOnDestroy(): void {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  submit() {
    if (this.entityForm.invalid) {
      return;
    }
    this.model$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromUser.UpdateAction({
          id: user.id,
          update: { ...user, ...this.entityForm.value }
        })
      );
    });
  }

  handleRemoveRole(role: KeycloakRole) {
    this.model$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromUserRoles.DeleteRoleFromUserAction({
          user: user,
          role: role
        })
      );
    });
  }

  handleDelete() {
    this.confirm
      .delete()
      .pipe(
        take(1),
        filter(ok => ok),
        switchMap(__ => this.model$.pipe(take(1)))
      )
      .subscribe(user => {
        this.store.dispatch(new fromUser.DeleteAction(user.id));
      });
  }

  handleAddRoleToUser(role: KeycloakRole) {
    this.model$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromUserRoles.AddRoleToUserAction({
          user: user,
          role: role
        })
      );
    });
  }

  public isBuiltInRole(roleId: string): boolean {
    return _.includes(BUILT_IN_ROLES, roleId);
  }

  public isBuiltInUser(username: string): boolean {
    return _.includes(BUILT_IN_USERS, username);
  }

  pageChange() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total && total >= this.pageSize) {
      this.store.dispatch(new fromUserGroups.NextPageAction());
    }
  }

  handleAddUserToGroup(group: KeycloakGroup) {
    this.model$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromUserGroups.AddAction({
          user: user,
          group: group
        })
      );
    });
  }

  handleRemoveUserFromGroup(group: KeycloakGroup) {
    this.model$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromUserGroups.DeleteAction({
          user: user,
          group: group
        })
      );
    });
  }
}
