import { Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Entity } from './entity.model';

export abstract class EntityFormComponent<TEntity extends Entity>
  implements OnInit {
  title: string;
  entity: TEntity;
  entityForm: FormGroup;
  fields: FormlyFieldConfig[];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: { title: string; payload: TEntity },
    protected dialogRef: MatDialogRef<EntityFormComponent<TEntity>>,
    protected translate: TranslateService
  ) {
    this.title = data.title;
    this.entity = data.payload;
  }

  buildForm(entity: TEntity) {
    this.entityForm = new FormGroup({});
  }

  ngOnInit() {
    this.buildForm(this.entity);
  }

  submit() {
    this.dialogRef.close(this.entityForm.value as Partial<TEntity>);
  }
}
