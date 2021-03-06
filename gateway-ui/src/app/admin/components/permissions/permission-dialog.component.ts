import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import {
  EntityFormComponent,
  untilDestroy,
  LeanCloudSearch,
  DEFAULT_PAGE_SIZE
} from '@app/libs';
import { Permission, KeycloakRole } from '@app/libs';
import { AppState } from '@app/core';

import * as fromRoot from '@app/core';
import { tag } from 'rxjs-spy/operators';
import { map, mapTo, catchError } from 'rxjs/operators';
import { QuestionService } from '@app/data-mgmt/services';

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
    private question$: QuestionService,
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
