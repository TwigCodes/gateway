import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EntityFormComponent } from '@app/libs';
import { Question } from '@app/data-mgmt/data-mgmt.model';

@Component({
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  styles: [``]
})
export class QuestionDialogComponent extends EntityFormComponent<Question> {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: Question },
    protected dialogRef: MatDialogRef<QuestionDialogComponent>,
    protected translate: TranslateService
  ) {
    super(data, dialogRef, translate);
    this.fields = [
      {
        key: 'title',
        type: 'textarea',
        templateOptions: {
          type: 'text',
          required: true,
          maxLength: 255,
          rows: 3
        },
        validators: {
          validation: [name]
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant(
              'tgapp.data-mgmt.question-dialog.title.label'
            ),
          'templateOptions.placeholder': () =>
            this.translate.instant(
              'tgapp.data-mgmt.question-dialog.title.placeholder'
            )
        }
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          required: true,
          options: [
            {
              value: 'text',
              label: this.translate.instant(
                'tgapp.data-mgmt.question.type.text.label'
              )
            },
            {
              value: 'tags',
              label: this.translate.instant(
                'tgapp.data-mgmt.question.type.tags.label'
              )
            },
            {
              value: 'checkbox',
              label: this.translate.instant(
                'tgapp.data-mgmt.question.type.checkbox.label'
              )
            }
          ]
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant(
              'tgapp.data-mgmt.question-dialog.type.label'
            ),
          'templateOptions.placeholder': () =>
            this.translate.instant(
              'tgapp.data-mgmt.question-dialog.type.placeholder'
            ),
          'templateOptions.description': () =>
            this.translate.instant(
              'tgapp.data-mgmt.question-dialog.type.description'
            )
        }
      }
    ];
  }
}
