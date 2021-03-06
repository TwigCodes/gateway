import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatListOption } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { take, switchMap, filter, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ConfirmService } from '@app/shared';
import { UserSearchService } from '@app/admin/services';
import {
  KeycloakUser,
  Permission,
  RolePermission
} from '@app/libs';
import { DEFAULT_PAGE_SIZE, untilDestroy } from '@app/libs';
import { BUILT_IN_ROLES, BUILT_IN_USERS } from '@app/admin/commons';

import * as fromAdmin from '@app/admin/store/reducers';
import * as fromRole from '@app/admin/store/actions/roles/role.actions';
import * as fromRoleUsers from '@app/admin/store/actions/roles/role-users.actions';
import * as fromRolePermissions from '@app/admin/store/actions/roles/role-permissions.actions';
import * as _ from 'lodash';

@Component({
  selector: 'tgapp-role-detail-container',
  templateUrl: './role-detail-container.component.html',
  styleUrls: ['./role-detail-container.component.scss']
})
export class RoleDetailContainerComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  readonly pageSize = DEFAULT_PAGE_SIZE;
  entityForm = new FormGroup({});
  model;
  params = new HttpParams()
    .set('pageIndex', '0')
    .set('pageSize', String(this.pageSize));
  model$ = this.store.pipe(select(fromAdmin.getRoleSelected));
  users$ = this.store.pipe(select(fromAdmin.getRoleUsers));
  fields: FormlyFieldConfig[];
  rolePermissions$: Observable<RolePermission[]>;
  availablePermissions$: Observable<Permission[]>;
  selectPerm = new Subject<Permission>();
  constructor(
    private store: Store<fromAdmin.State>,
    private translate: TranslateService,
    private confirm: ConfirmService,
    public service: UserSearchService
  ) {}
  ngOnInit(): void {
    this.rolePermissions$ = this.store.pipe(
      select(fromAdmin.getRolePermissions)
    );
    this.availablePermissions$ = this.store.pipe(
      select(fromAdmin.getRoleAvailabePerms)
    );
    this.model$.pipe(untilDestroy(this)).subscribe(val => {
      this.model = { ...val };
      this.fields = [
        {
          key: 'name',
          type: 'input',
          validators: {
            validation: ['name']
          },
          templateOptions: { type: 'text', required: true, readonly: true },
          expressionProperties: {
            'templateOptions.label': () =>
              this.translate.instant('tgapp.admin.role-dialog.name.label'),
            'templateOptions.placeholder': () =>
              this.translate.instant(
                'tgapp.admin.role-dialog.name.placeholder'
              ),
            'templateOptions.disabled': () =>
              val && val.name ? this.isBuiltInRole(val.name) : false
          }
        },
        {
          key: 'description',
          type: 'textarea',
          templateOptions: {
            type: 'text',
            required: true,
            maxLength: 255,
            rows: 3
          },
          expressionProperties: {
            'templateOptions.label': () =>
              this.translate.instant(
                'tgapp.admin.role-dialog.description.label'
              ),
            'templateOptions.placeholder': () =>
              this.translate.instant(
                'tgapp.admin.role-dialog.description.placeholder'
              ),
            'templateOptions.disabled': () =>
              val && val.name ? this.isBuiltInRole(val.name) : false
          }
        }
      ];
    });
  }
  ngOnDestroy() {}
  submit() {
    if (this.entityForm.invalid) {
      return;
    }
    this.model$.pipe(take(1)).subscribe(role => {
      this.store.dispatch(
        new fromRole.UpdateAction({
          id: role.id,
          update: { ...role, ...this.entityForm.value }
        })
      );
    });
  }

  handleAddRoleMapping() {}

  handleRemoveUser(user: KeycloakUser) {
    this.model$.pipe(take(1)).subscribe(role => {
      this.store.dispatch(
        new fromRoleUsers.DeleteUserFromRoleAction({
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
      .subscribe(role => {
        this.store.dispatch(new fromRole.DeleteAction(role.id));
      });
  }

  selectUser(user: KeycloakUser) {
    this.model$.pipe(take(1)).subscribe(role => {
      this.store.dispatch(
        new fromRoleUsers.AddUserToRoleAction({
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

  trackByIdx(i) {
    return i;
  }

  pageChange() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total && total >= this.pageSize) {
      this.store.dispatch(new fromRoleUsers.NextPageAction());
    }
  }

  handleSelection(options: MatListOption[]) {
    options
      .map(option => option.value)
      .forEach(perm =>
        this.store.dispatch(
          new fromRolePermissions.AddPermissionToRoleAction(perm)
        )
      );
  }

  removePermFromRole(perm: Partial<RolePermission>) {
    const permission = new RolePermission(perm);
    this.store.dispatch(
      new fromRolePermissions.DeletePermissionFromRoleAction(permission.id)
    );
  }
}
