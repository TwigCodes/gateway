import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionWizardComponent } from './question-wizard.component';
import {
  MatStepperModule,
  MatFormFieldModule,
  MatRadioModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule
} from '@angular/material';
import { CheckBoxListModule } from '../check-box-list';
import { MultiSelectChipsModule } from '../multi-select-chips';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [QuestionWizardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    CheckBoxListModule,
    MultiSelectChipsModule,
    TranslateModule
  ],
  exports: [QuestionWizardComponent]
})
export class QuestionWizardModule {}
