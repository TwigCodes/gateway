import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  DynaTableModule,
  MaterialModule,
  CdkModule,
  CheckBoxListModule,
  MultiSelectChipsModule,
  AutocompleteModule,
  BigInputModule,
  JsonDiffModule,
  BreadCrumbsModule,
  ListOrGridWithFilterModule,
  ConfirmDialogModule,
  SimpleTreeModule,
  MaterialFileInputModule,
  FormlyControlsModule,
  QuestionWizardModule
} from '.';
import { NotFoundModule } from './not-found';

@NgModule({
  exports: [
    MaterialModule,
    CdkModule,
    FlexLayoutModule,
    DynaTableModule,
    CheckBoxListModule,
    MultiSelectChipsModule,
    AutocompleteModule,
    BigInputModule,
    JsonDiffModule,
    BreadCrumbsModule,
    ListOrGridWithFilterModule,
    ConfirmDialogModule,
    SimpleTreeModule,
    MaterialFileInputModule,
    FormlyControlsModule,
    QuestionWizardModule
  ]
})
export class TwigLibsModule {}
