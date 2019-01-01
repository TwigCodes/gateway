import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { take, filter, switchMap } from 'rxjs/operators';
import { UserSearchService } from '@app/admin/services';
import { KeycloakUser, KeycloakRole } from '@app/admin/admin.model';
import { ConfirmService } from '@app/shared/confirm/confirm.service';

import * as fromAdmin from '../../reducers';
import * as fromGroup from '../../actions/groups/group.actions';
import * as fromGroupRole from '../../actions/groups/group-detail-roles.actions';
import * as fromGroupMapping from '../../actions/groups/group-mapping.actions';

import * as _ from 'lodash';

@Component({
  selector: 'tgapp-group-detail-container',
  templateUrl: './group-detail-container.component.html',
  styleUrls: ['./group-detail-container.component.scss']
})
export class GroupDetailContainerComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  readonly pageSize = 25;
  entityForm = new FormGroup({});
  role = null;
  model;
  params = new HttpParams().set('pageIndex', '0').set('pageSize', '25');
  model$ = this.store.pipe(select(fromAdmin.getSelectedGroup));
  users$ = this.store.pipe(select(fromAdmin.getMembers));
  availableRoles$ = this.store.pipe(select(fromAdmin.getAvailableRoles));
  assignedRoles$ = this.store.pipe(select(fromAdmin.getRealmRoles));
  sub = new Subscription();
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        required: true
      },
      expressionProperties: {
        'templateOptions.label': () =>
          this.translate.instant('tgapp.admin.group-detail.name.label'),
        'templateOptions.placeholder': () =>
          this.translate.instant('tgapp.admin.group-detail.name.placeholder')
      }
    }
  ];
  constructor(
    private store: Store<fromAdmin.State>,
    private translate: TranslateService,
    private confirm: ConfirmService,
    public service: UserSearchService
  ) {}
  ngOnInit(): void {
    this.sub.add(
      this.model$.subscribe(val => {
        this.model = { ...val };
      })
    );
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
        new fromGroupMapping.AddUserToGroupAction({
          user: user,
          group: group
        })
      );
    });
  }

  handleRemoveUserFromGroup(user: KeycloakUser) {
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroupMapping.DeleteUserFromGroupAction({
          user: user,
          group: group
        })
      );
    });
  }

  handleRemoveRoleFromGroup(role: KeycloakRole) {
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroupRole.DeleteRolesFromGroupAction({
          roles: [role],
          group: group
        })
      );
    });
  }

  handleAddRoleToGroup(ev: MatSelectChange) {
    this.model$.pipe(take(1)).subscribe(group => {
      this.store.dispatch(
        new fromGroupRole.AddRolesToGroupAction({
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
