import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { take, switchMap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ConfirmService } from '@app/shared';
import { UserSearchService } from '@app/admin/services';
import { KeycloakUser } from '@app/admin/admin.model';

import * as fromAdmin from '@app/admin/reducers';
import * as fromRole from '@app/admin/actions/roles/role.actions';
import * as fromRoleDetail from '@app/admin/actions/roles/role-users.actions';
import * as fromRoleUsers from '@app/admin/actions/roles/role-users.actions';
import { DEFAULT_PAGE_SIZE } from '@app/libs';
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
  sub: Subscription;
  fields: FormlyFieldConfig[];
  constructor(
    private store: Store<fromAdmin.State>,
    private translate: TranslateService,
    private confirm: ConfirmService,
    public service: UserSearchService
  ) {}
  ngOnInit(): void {
    this.sub = this.model$.subscribe(val => {
      this.model = { ...val };
      this.fields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: { type: 'text', required: true },
          expressionProperties: {
            'templateOptions.label': () =>
              this.translate.instant('tgapp.admin.role-dialog.name.label'),
            'templateOptions.placeholder': () =>
              this.translate.instant(
                'tgapp.admin.role-dialog.name.placeholder'
              ),
            'templateOptions.disabled': () =>
              val && val.name ? this.isBuiltIn(val.name) : false
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
              val && val.name ? this.isBuiltIn(val.name) : false
          }
        }
      ];
    });
  }
  ngOnDestroy() {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
  }
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

  public isBuiltIn(roleId: string): boolean {
    const builtInRoles = ['admin', 'user'];
    return _.includes(builtInRoles, roleId);
  }

  trackByIdx(i) {
    return i;
  }

  pageChange() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total && total >= this.pageSize) {
      this.store.dispatch(new fromRoleDetail.NextPageAction());
    }
  }
}
