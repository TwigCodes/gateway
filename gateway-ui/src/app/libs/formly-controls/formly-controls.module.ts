import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ]
      // types: [
      //   {
      //     name: 'chips',
      //     component: FormlyMaterialChipsComponent,
      //     //wrappers: ["fieldset", "label"],
      //     extends: 'input'
      //   }
      // ]
    }),
    FormlyMatToggleModule
  ],
  exports: [FormlyMaterialModule, FormlyModule, FormlyMatToggleModule]
})
export class FormlyControlsModule {}
