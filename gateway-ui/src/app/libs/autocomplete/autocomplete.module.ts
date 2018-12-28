import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatIconModule,
  MatProgressBarModule,
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
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
