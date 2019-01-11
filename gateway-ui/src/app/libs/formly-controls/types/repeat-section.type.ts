import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'ngx-repeat-section',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index">
      <formly-group
        [model]="model[i]"
        [field]="field"
        [options]="options"
        [form]="formControl"
      >
        <div class="col-sm-2 d-flex align-items-center">
          <button
            mat-icon-button
            type="button"
            (click)="remove(i)"
            matTooltip="{{
              'ngx-formly.type.repeat-section.button.remove' | translate
            }}"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </formly-group>
    </div>
    <div style="margin:30px 0;">
      <button mat-button type="button" (click)="add()">
        {{ field.fieldArray.templateOptions.btnText }}
      </button>
    </div>
  `,
  styles: [``]
})
export class RepeatSectionTypeComponent extends FieldArrayType {
  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}
