import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatIconModule,
  MatProgressBarModule,
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressBarModule,
    MatOptionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule {}
