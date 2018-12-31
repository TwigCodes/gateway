import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    FormlyModule.forRoot({
      // types: [
      //   {
      //     name: 'chips',
      //     component: FormlyMaterialChipsComponent,
      //     //wrappers: ["fieldset", "label"],
      //     extends: 'input'
      //   }
      // ]
    })
  ],
  exports: [],
  providers: []
})
export class FormlyControlsModule {}
