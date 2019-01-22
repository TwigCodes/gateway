import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import {
  EntityFormComponent,
  namePattern,
  nameValidationMessage
} from '@app/libs';
import { RolePermission } from '@app/admin/admin.model';
import { RoleService } from '@app/admin/services';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: '../../../libs/entity/templates/entity-form.html',
  styles: [``]
})
export class RolePermissionDialogComponent extends EntityFormComponent<
  RolePermission
> {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: RolePermission },
    protected dialogRef: MatDialogRef<RolePermissionDialogComponent>,
    protected translate: TranslateService,
    private roleService: RoleService
  ) {
    super(data, dialogRef, translate);
    this.fields = [
      {
        key: 'roleName',
        type: 'autocomplete',
        templateOptions: {
          filter: (query: string) =>
            this.roleService
              .getAll()
              .pipe(
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
        key: 'permissions',
        type: 'repeat',
        fieldArray: {
          fieldGroupClassName: 'row',
          templateOptions: { btnText: 'Add another permission' },
          fieldGroup: [
            {
              className: 'col-sm-4',
              type: 'input',
              key: 'route',
              templateOptions: { label: 'Route', required: true }
            },
            {
              type: 'input',
              key: 'name',
              className: 'col-sm-3',
              templateOptions: { label: 'Name', required: true }
            }
          ]
        }
      }
    ];
  }
}
