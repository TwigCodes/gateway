import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
  MatOptionModule,
  MatTooltipModule
} from '@angular/material';
import { FormlyModule, FormlyConfig, FORMLY_CONFIG } from '@ngx-formly/core';
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
  addValidationMessagesToConfig,
  englishNameValidator,
  routeValidator
} from './validators';
import { RepeatSectionTypeComponent, AutocompleteTypeComponent } from './types';

const COMPONENTS = [RepeatSectionTypeComponent];

@NgModule({
  declarations: [RepeatSectionTypeComponent, AutocompleteTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatOptionModule,
    MatTooltipModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'email', validation: emailValidator },
        { name: 'name', validation: nameValidator },
        { name: 'url', validation: urlValidator },
        { name: 'human', validation: humanNameValidator },
        { name: 'username', validation: usernameValidator },
        { name: 'mobile', validation: mobileValidator },
        { name: 'englishName', validation: englishNameValidator },
        { name: 'route', validation: routeValidator }
      ],
      types: [
        { name: 'repeat', component: RepeatSectionTypeComponent },
        {
          name: 'autocomplete',
          component: AutocompleteTypeComponent,
          wrappers: ['form-field']
        }
      ]
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
