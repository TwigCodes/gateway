import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; payload: KeycloakUser },
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private fb: FormBuilder
  ) {
    super(data, dialogRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  buildForm(item: KeycloakUser) {
    this.entityForm = this.fb.group({
      username: [item ? item.username || '' : '', Validators.required],
      email: [item ? item.email || '' : '', Validators.required]
    });
  }
}
