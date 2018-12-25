import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityFormComponent } from '@app/libs/entity/entity-form.component';
import { KeycloakRole } from '@app/admin/admin.model';

@Component({
  selector: 'tgapp-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDialogComponent extends EntityFormComponent<KeycloakRole>
  implements OnInit {
  model = null;
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
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; payload: KeycloakRole },
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    super(data, dialogRef);
    this.model = { ...data.payload };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  buildForm(item: KeycloakRole) {
    this.entityForm = this.fb.group({});
  }
}
