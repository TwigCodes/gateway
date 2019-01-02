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
  FormlyControlsModule
} from '.';

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
    FormlyControlsModule
  ]
})
export class TwigLibsModule {}
