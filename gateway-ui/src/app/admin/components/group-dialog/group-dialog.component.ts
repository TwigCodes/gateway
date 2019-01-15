import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EntityFormComponent } from '@app/libs/entity/entity-form.component';
import { KeycloakGroup } from '@app/admin/admin.model';

@Component({
  selector: 'tgapp-group-dialog',
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDialogComponent extends EntityFormComponent<KeycloakGroup> {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: KeycloakGroup },
    protected dialogRef: MatDialogRef<GroupDialogComponent>,
    protected translate: TranslateService
  ) {
    super(data, dialogRef, translate);
    this.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: { type: 'text', required: true, maxLength: 50 },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.group-dialog.name.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant('tgapp.admin.group-dialog.name.placeholder')
        }
      }
    ];
  }
}
