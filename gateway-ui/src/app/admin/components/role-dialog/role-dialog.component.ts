import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EntityFormComponent } from '@app/libs/entity/entity-form.component';
import { KeycloakRole } from '@app/admin/admin.model';

@Component({
  selector: 'tgapp-role-dialog',
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDialogComponent extends EntityFormComponent<KeycloakRole> {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: KeycloakRole },
    protected dialogRef: MatDialogRef<RoleDialogComponent>,
    protected translate: TranslateService
  ) {
    super(data, dialogRef, translate);
    this.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: { type: 'text', required: true, maxLength: 50 },
        validators: {
          validation: ['name']
        },
        asyncValidators: {
          validation: ['uniqueRoleName']
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.role-dialog.name.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant('tgapp.admin.role-dialog.name.placeholder')
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
            this.translate.instant('tgapp.admin.role-dialog.description.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant(
              'tgapp.admin.role-dialog.description.placeholder'
            )
        }
      }
    ];
  }
}
