import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material';
import { FormlyModule, FormlyConfig } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {
  emailValidator,
  nameValidator,
  urlValidator,
  humanNameValidator,
  usernameValidator,
  mobileValidator,
  COMMON_VALIDATION_MESSAGES,
  addValidationMessagesToConfig
} from './validators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
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
export class FormlyControlsModule {
  constructor(
    private config: FormlyConfig,
    private translate: TranslateService
  ) {
    this.translate.stream(COMMON_VALIDATION_MESSAGES).subscribe(msg => {
      console.log(msg);
      addValidationMessagesToConfig(msg, this.config);
    });
  }
}
