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
        validators: { validation: ['name'] },
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
                'tgapp.data-mgmt.question-dialog.type.text.label'
              )
            },
            {
              value: 'tags',
              label: this.translate.instant(
                'tgapp.data-mgmt.question-dialog.type.tags.label'
              )
            },
            {
              value: 'checkbox',
              label: this.translate.instant(
                'tgapp.data-mgmt.question-dialog.type.checkbox.label'
              )
            }
          ]
        },
        expressionProperties: {
          'templateOptions.label': () =>
            this.translate.instant(
              'tgapp.data-mgmt.question-dialog.type.label'
            ),
          'templateOptions.description': () =>
            this.translate.instant(
              'tgapp.data-mgmt.question-dialog.type.description'
            )
        }
      },
      {
        key: 'options',
        type: 'repeat',
        hideExpression: () => {
          const val = this.entityForm.get('type').value;
          return !val
            ? true
            : val === 'tags' || val === 'checkbox'
            ? false
            : true;
        },
        fieldArray: {
          fieldGroupClassName: 'row',
          templateOptions: { btnText: 'Add another option' },
          fieldGroup: [
            {
              className: 'col-sm-4',
              type: 'input',
              key: 'label',
              templateOptions: { label: 'Label', required: true }
            },
            {
              type: 'input',
              key: 'value',
              className: 'col-sm-3',
              templateOptions: { label: 'Value', required: true }
            }
          ]
        }
      }
    ];
    // username: {
    //   expression: c => usernamePattern.test(c.value),
    //   message: this.translate.instant(usernameValidationMessage)
    // }
  }
}
