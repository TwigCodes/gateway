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
import { KeycloakGroup } from '@app/admin/admin.model';

@Component({
  selector: 'tgapp-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDialogComponent extends EntityFormComponent<KeycloakGroup>
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
          this.translate.instant('tgapp.admin.group-dialog.name.label'),
        'templateOptions.placeholder': () =>
          this.translate.instant('tgapp.admin.group-dialog.name.placeholder')
      }
    }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; payload: KeycloakGroup },
    public dialogRef: MatDialogRef<GroupDialogComponent>,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    super(data, dialogRef);
    this.model = { ...data.payload };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  buildForm(item: KeycloakGroup) {
    this.entityForm = this.fb.group({});
  }
}
