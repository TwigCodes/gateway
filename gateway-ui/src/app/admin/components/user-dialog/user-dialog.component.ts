import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { EntityFormComponent } from '@app/libs/entity/entity-form.component';
import { KeycloakUser } from '@app/admin/admin.model';
import { usernamePattern, usernameValidationMessage } from '@app/libs';

@Component({
  selector: 'tgapp-user-dialog',
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent extends EntityFormComponent<KeycloakUser> {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: KeycloakUser },
    protected dialogRef: MatDialogRef<UserDialogComponent>,
    protected translate: TranslateService
  ) {
    super(data, dialogRef, translate);
    this.fields = [
      {
        key: 'username',
        type: 'input',
        templateOptions: { type: 'text', required: true },
        validators: {
          validation: ['username']
          // username: {
          //   expression: c => usernamePattern.test(c.value),
          //   message: this.translate.instant(usernameValidationMessage)
          // }
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.user-dialog.username.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant(
              'tgapp.admin.user-dialog.username.placeholder'
            )
        }
      },
      {
        key: 'firstName',
        type: 'input',
        templateOptions: { type: 'text', required: true, maxLength: 30 },
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
        templateOptions: { type: 'text', required: true, maxLength: 30 },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.user-dialog.lastname.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant(
              'tgapp.admin.user-dialog.lastname.placeholder'
            )
        }
      },
      {
        key: 'email',
        type: 'input',
        templateOptions: { type: 'email', required: true },
        validators: {
          validation: ['email']
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.user-dialog.email.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant('tgapp.admin.user-dialog.email.placeholder')
        }
      },
      {
        key: 'enabled',
        type: 'toggle',
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.user-dialog.enabled.label'),
          'templateOptions.description': () =>
            this.translate.instant(
              'tgapp.admin.user-dialog.enabled.description'
            )
        }
      }
    ];
  }
}
