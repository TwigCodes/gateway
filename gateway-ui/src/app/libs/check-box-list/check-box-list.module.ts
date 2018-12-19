import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';
import { CheckBoxListComponent } from './check-box-list.component';

@NgModule({
  declarations: [CheckBoxListComponent],
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule, FormsModule],
  exports: [CheckBoxListComponent]
})
export class CheckBoxListModule {}
