import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { EntityFormComponent, untilDestroy } from '@app/libs';
import { RolePermission, KeycloakRole } from '@app/admin/admin.model';
import { RoleService, RolePermissionService } from '@app/admin/services';
import { AppState } from '@app/core';

import * as fromRoot from '@app/core';
import { FormControl } from '@angular/forms';
import { of, Observable } from 'rxjs';

@Component({
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  styles: [``]
})
export class RolePermissionDialogComponent
  extends EntityFormComponent<RolePermission>
  implements OnDestroy {
  role$: Observable<KeycloakRole[]>;
  permission$: Observable<RolePermission[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: RolePermission },
    protected dialogRef: MatDialogRef<RolePermissionDialogComponent>,
    protected translate: TranslateService,
    private roleService: RoleService,
    private permissionService: RolePermissionService,
    private store: Store<AppState>
  ) {
    super(data, dialogRef, translate);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.role$ = this.roleService.getAll();
    this.permission$ = this.permissionService.getAll();
    this.store
      .pipe(
        select(fromRoot.getCurrentTenant),
        untilDestroy(this)
      )
      .subscribe(tenant => {
        this.fields = [
          {
            key: 'roleName',
            type: 'autocomplete',
            templateOptions: {
              filter: (query: string) =>
                this.role$.pipe(
                  map(roles =>
                    roles
                      .map(role => role.name)
                      .filter(roleName =>
                        roleName.toLowerCase().includes(query.toLowerCase())
                      )
                  )
                ),
              required: true
            },
            asyncValidators: {
              validation: [
                (control: FormControl) => {
                  return this.entity != null &&
                    control.value === this.entity.roleName
                    ? of(null)
                    : this.permission$.pipe(
                        map(
                          permissions =>
                            permissions.filter(
                              permission =>
                                permission.roleName === control.value &&
                                permission.tenant === tenant
                            ).length === 0
                        ),
                        map(isValid =>
                          isValid ? null : { roleNameExisted: true }
                        )
                      );
                }
              ]
            },
            expressionProperties: {
              'templateOptions.label': () =>
                this.translate.instant(
                  'tgapp.admin.role-permission-dialog.role-name.label'
                ),
              'templateOptions.placeholder': () =>
                this.translate.instant(
                  'tgapp.admin.role-permission-dialog.role-name.placeholder'
                )
            }
          },
          {
            key: 'tenant',
            type: 'input',
            defaultValue: tenant,
            templateOptions: {
              hidden: true,
              required: true
            }
          },
          {
            key: 'permissions',
            type: 'repeat',
            fieldArray: {
              fieldGroupClassName: 'row',
              templateOptions: {
                btnText: this.translate.instant(
                  'tgapp.admin.role-permission-dialog.add-permission.title'
                )
              },
              fieldGroup: [
                {
                  type: 'input',
                  key: 'name',
                  className: 'col-sm-6',
                  validators: {
                    validation: ['englishName']
                  },
                  templateOptions: {
                    label: this.translate.instant(
                      'tgapp.admin.role-permission-dialog.permission.name'
                    ),
                    required: true
                  }
                }
              ]
            }
          }
        ];
      });
  }
  ngOnDestroy(): void {}
}
