import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import {
  emailValidator,
  nameValidator,
  urlValidator,
  humanNameValidator,
  usernameValidator,
  mobileValidator,
  emailValidationMessage,
  nameValidationMessage,
  urlValidationMessage,
  usernameValidationMessage,
  mobileValidationMessage,
  humanNameValidationMessage,
  requiredValidationMessage,
  minValidationMessage,
  maxValidationMessage,
  minLengthValidationMessage,
  maxLengthValidationMessage
} from '../validators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'email', validation: emailValidator },
        { name: 'name', validation: nameValidator },
        { name: 'url', validation: urlValidator },
        { name: 'human', validation: humanNameValidator },
        { name: 'username', validation: usernameValidator },
        { name: 'mobile', validation: mobileValidator }
      ],
      validationMessages: [
        { name: 'required', message: requiredValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'minlength', message: minLengthValidationMessage },
        { name: 'maxlength', message: maxLengthValidationMessage },
        { name: 'email', message: emailValidationMessage },
        { name: 'name', message: nameValidationMessage },
        { name: 'url', message: urlValidationMessage },
        { name: 'human', message: humanNameValidationMessage },
        { name: 'username', message: usernameValidationMessage },
        { name: 'mobile', message: mobileValidationMessage }
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
