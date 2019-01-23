import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { take, filter, switchMap } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { UserSearchService } from '@app/admin/services';
import { KeycloakUser, KeycloakRole } from '@app/admin/admin.model';
import { ConfirmService } from '@app/shared/confirm/confirm.service';
import { DEFAULT_PAGE_SIZE, untilDestroy } from '@app/libs';

import * as fromAdmin from '@app/admin/store/reducers';
import * as fromGroup from '@app/admin/store/actions/groups/group.actions';
import * as fromGroupRoles from '@app/admin/store/actions/groups/group-roles.actions';
import * as fromGroupUsers from '@app/admin/store/actions/groups/group-users.actions';

import * as _ from 'lodash';

@Component({
  selector: 'tgapp-group-detail-container',
  templateUrl: './group-detail-container.component.html',
  styleUrls: ['./group-detail-container.component.scss']
})
export class GroupDetailContainerComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  readonly pageSize = DEFAULT_PAGE_SIZE;
  entityForm = new FormGroup({});
  role = null;
  model;
  params = new HttpParams()
    .set('pageIndex', '0')
    .set('pageSize', String(this.pageSize));
  model$ = this.store.pipe(
    select(fromAdmin.getSelectedGroup),
    tag('selectedGroup')
  );
  users$ = this.model$.pipe(
    filter(val => val != null),
    switchMap(__ => this.store.pipe(select(fromAdmin.getMembers)))
  );
  availableRoles$ = this.model$.pipe(
    filter(val => val != null),
    switchMap(__ => this.store.pipe(select(fromAdmin.getAvailableRoles)))
  );
  assignedRoles$ = this.model$.pipe(
    filter(val => val != null),
    switchMap(__ => this.store.pipe(select(fromAdmin.getRealmRoles)))
  );
  fields: FormlyFieldConfig[];
  constructor(
    private store: Store<fromAdmin.State>,
    private translate: TranslateService,
    private confirm: ConfirmService,
    public service: UserSearchService
  ) {}
  ngOnInit(): void {
    this.fields = [
      {
        key: 'name',
        type: 'input',
        validators: {
          validation: ['name']
        },
        templateOptions: {
          type: 'text',
          required: true,
          readonly: true
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.group-detail.name.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant('tgapp.admin.group-detail.name.placeholder')
        }
      }
    ];
    this.model$.pipe(untilDestroy(this)).subscribe(val => {
      this.model = { ...val };
    });
  }
  ngOnDestroy() {}
  submit() {
    if (this.entityForm.invalid) {
      return;
    }
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroup.UpdateAction({
          id: group.id,
          update: { ...group, ...this.entityForm.value }
        })
      );
    });
  }

  handleAddUserToGroup(user: KeycloakUser) {
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroupUsers.AddUserToGroupAction({
          user: user,
          group: group
        })
      );
    });
  }

  handleRemoveUserFromGroup(user: KeycloakUser) {
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroupUsers.DeleteUserFromGroupAction({
          user: user,
          group: group
        })
      );
    });
  }

  handleRemoveRoleFromGroup(role: KeycloakRole) {
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroupRoles.DeleteRolesFromGroupAction({
          roles: [role],
          group: group
        })
      );
    });
  }

  handleAddRoleToGroup(ev: MatSelectChange) {
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroupRoles.AddRolesToGroupAction({
          roles: [ev.value],
          group: group
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
      .subscribe(group => {
        this.store.dispatch(new fromGroup.DeleteAction(group.id));
      });
  }

  selectUser(user: KeycloakUser) {
    this.model$.pipe(take(1)).subscribe(group => {});
  }

  trackByIdx(i: number) {
    return i;
  }

  pageChange() {
    // const end = this.viewport.getRenderedRange().end;
    // const total = this.viewport.getDataLength();
    // console.log(`${end}, '>=', ${total}`);
    // if (end === total && total >= this.pageSize) {
    //   this.store.dispatch(new fromGroupDetail.NextPageAction());
    // }
  }

  /**
   * paths
   */
  public paths(path: string) {
    return path.split('/').filter(val => val);
  }
}
