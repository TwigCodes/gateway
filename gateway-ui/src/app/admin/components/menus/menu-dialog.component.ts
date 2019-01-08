import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import {
  EntityFormComponent,
  namePattern,
  nameValidationMessage
} from '@app/libs';
import { AdminMenuItem } from '@app/admin/admin.model';

@Component({
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  styles: [``]
})
export class MenusDialogComponent extends EntityFormComponent<AdminMenuItem> {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: AdminMenuItem },
    protected dialogRef: MatDialogRef<MenusDialogComponent>,
    protected translate: TranslateService
  ) {
    super(data, dialogRef, translate);
    this.fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: { type: 'text', required: true, maxLength: 100 },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.menus-dialog.title.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant('tgapp.admin.menus-dialog.title.placeholder')
        }
      },
      {
        key: 'subtitle',
        type: 'input',
        templateOptions: { type: 'text', required: true, maxLength: 100 },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.menus-dialog.subtitle.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant(
              'tgapp.admin.menus-dialog.subtitle.placeholder'
            )
        }
      },
      {
        key: 'desc',
        type: 'input',
        templateOptions: {
          type: 'text',
          required: true,
          maxLength: 100
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.menus-dialog.desc.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant('tgapp.admin.menus-dialog.desc.placeholder')
        }
      },
      {
        key: 'link',
        type: 'input',
        templateOptions: { type: 'text', required: true, maxLength: 50 },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant('tgapp.admin.menus-dialog.link.label'),
          'templateOptions.placeholder': () =>
            this.translate.instant('tgapp.admin.menus-dialog.link.placeholder')
        }
      }
    ];
  }
}
