import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { EntityFormComponent, untilDestroy } from '@app/libs';
import { Permission, KeycloakRole } from '@app/admin/admin.model';
import { AppState } from '@app/core';

import * as fromRoot from '@app/core';

@Component({
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  styles: [``]
})
export class PermissionDialogComponent extends EntityFormComponent<Permission>
  implements OnDestroy {
  role$: Observable<KeycloakRole[]>;
  permission$: Observable<Permission[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: Permission },
    protected dialogRef: MatDialogRef<PermissionDialogComponent>,
    protected translate: TranslateService,
    private store: Store<AppState>
  ) {
    super(data, dialogRef, translate);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.store
      .pipe(
        select(fromRoot.getCurrentTenant),
        untilDestroy(this)
      )
      .subscribe(tenant => {
        this.fields = [
          {
            key: 'tenant',
            type: 'input',
            defaultValue: tenant,
            templateOptions: {
              readonly: true,
              required: true
            }
          },
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              required: true
            }
          }
        ];
      });
  }
  ngOnDestroy(): void {}
}
