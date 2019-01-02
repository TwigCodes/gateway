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

import * as fromAdminReducer from '../../reducers';
import * as fromUser from '../../actions/users/user.actions';
import * as fromUserRoles from '../../actions/users/user-roles.actions';
import * as fromUsers from '../../reducers/users';
import * as fromRole from '../../actions/roles/role.actions';
import * as fromRoleSelectors from '../../reducers/roles/roles.selectors';
import * as fromUserGroups from '../../actions/users/user-groups.actions';
import * as _ from 'lodash';

@Component({
  selector: 'tgapp-user-detail-container',
  templateUrl: './user-detail-container.component.html',
  styleUrls: ['./user-detail-container.component.scss']
})
export class UserDetailContainerComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  readonly pageSize = 25;
  entityForm = new FormGroup({});
  params = new HttpParams()
    .set('pageIndex', '0')
    .set('pageSize', String(this.pageSize));
  model;
  model$ = this.store.pipe(select(fromUsers.getUserSelected));
  roles$ = this.store.pipe(select(fromUsers.getUserRoles));
  groups$ = this.store.pipe(select(fromUsers.getUserGroups));
  availableRoles$ = this.store.pipe(select(fromRoleSelectors.selectAll));
  sub: Subscription;
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        type: 'text',
        required: true
      },
      expressionProperties: {
        'templateOptions.label': () =>
          this.translate.instant('tgapp.admin.user-dialog.username.label'),
        'templateOptions.placeholder': () =>
          this.translate.instant('tgapp.admin.user-dialog.username.placeholder')
      }
    },
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        type: 'text',
        required: true
      },
      expressionProperties: {
        'templateOptions.label': () =>
          this.translate.instant('tgapp.admin.user-dialog.firstname.label'),
        'templateOptions.placeholder': () =>
          this.translate.instant(
            'tgapp.admin.user-dialog.firstname.placeholder'
          )
      }
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: {
        type: 'text',
        required: true
      },
      expressionProperties: {
        'templateOptions.label': () =>
          this.translate.instant('tgapp.admin.user-dialog.lastname.label'),
        'templateOptions.placeholder': () =>
          this.translate.instant('tgapp.admin.user-dialog.lastname.placeholder')
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        required: true
      },
      expressionProperties: {
        'templateOptions.label': () =>
          this.translate.instant('tgapp.admin.user-dialog.email.label'),
        'templateOptions.placeholder': () =>
          this.translate.instant('tgapp.admin.user-dialog.email.placeholder')
      }
    }
  ];
  constructor(
    private store: Store<fromAdminReducer.State>,
    private translate: TranslateService,
    private confirm: ConfirmService,
    public groupService: GroupSearchService
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromRole.GetAllAction());
    this.sub = this.model$.subscribe(val => {
      this.model = { ...val };
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

  public isBuiltIn(username: string): boolean {
    const builtInUsers = ['twigadmin'];
    return _.includes(builtInUsers, username);
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
