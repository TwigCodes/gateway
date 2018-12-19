import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectChipsComponent } from './multi-select-chips.component';

@NgModule({
  declarations: [MultiSelectChipsComponent],
  imports: [CommonModule, MatChipsModule, FormsModule, ReactiveFormsModule],
  exports: [MultiSelectChipsComponent]
})
export class MultiSelectChipsModule {}
