import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { EntityFormComponent } from '@app/libs/entity/entity-form.component';
import { KeycloakUser } from '@app/admin/admin.model';

@Component({
  selector: 'tgapp-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent extends EntityFormComponent<KeycloakUser>
  implements OnInit {
  model = null;
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
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; payload: KeycloakUser },
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private translate: TranslateService
  ) {
    super(data, dialogRef);
    this.model = { ...data.payload };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  buildForm(item: KeycloakUser) {
    this.entityForm = new FormGroup({});
  }
}
