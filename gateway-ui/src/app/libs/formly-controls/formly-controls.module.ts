import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
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
import { RepeatSectionTypeComponent } from './types';

const COMPONENTS = [RepeatSectionTypeComponent];

@NgModule({
  declarations: [RepeatSectionTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
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
      types: [{ name: 'repeat', component: RepeatSectionTypeComponent }]
    }),
    FormlyMatToggleModule
  ],
  exports: [
    FormlyMaterialModule,
    FormlyModule,
    FormlyMatToggleModule,
    ...COMPONENTS
  ]
})
export class FormlyControlsModule {
  constructor(
    private config: FormlyConfig,
    private translate: TranslateService
  ) {
    addValidationMessagesToConfig(this.config, this.translate);
  }
}
