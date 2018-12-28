import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take, filter, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmService } from '@app/shared/confirm/confirm.service';
import { KeycloakRole } from '@app/admin/admin.model';

import * as fromAdminReducer from '../../reducers';
import * as fromUser from '../../actions/user.actions';
import * as fromRoleMapping from '../../actions/role-mapping.actions';
import * as fromUserDetailSelectors from '../../reducers/user-detail.selectors';
import * as fromRole from '../../actions/role.actions';
import * as fromRoleSelectors from '../../reducers/role.selectors';
import * as _ from 'lodash';

@Component({
  selector: 'tgapp-user-detail-container',
  templateUrl: './user-detail-container.component.html',
  styleUrls: ['./user-detail-container.component.scss']
})
export class UserDetailContainerComponent implements OnInit, OnDestroy {
  entityForm = new FormGroup({});
  model;
  model$ = this.store.pipe(select(fromUserDetailSelectors.selectUser));
  roles$ = this.store.pipe(select(fromUserDetailSelectors.selectRoles));
  source$ = this.store.pipe(select(fromRoleSelectors.selectAll));
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
    private confirm: ConfirmService
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

  handleAddRoleMapping() {}

  handleRemoveRole(role: KeycloakRole) {
    this.model$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromRoleMapping.DeleteRoleFromUserAction({
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
        switchMap(_ => this.model$.pipe(take(1)))
      )
      .subscribe(user => {
        this.store.dispatch(new fromUser.DeleteAction(user.id));
      });
  }

  selectRole(role: KeycloakRole) {
    this.model$.pipe(take(1)).subscribe(user => {
      this.store.dispatch(
        new fromRoleMapping.AddRoleToUserAction({
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
}
