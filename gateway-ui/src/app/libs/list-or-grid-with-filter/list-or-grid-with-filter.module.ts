import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrGridWithFilterComponent } from './list-or-grid-with-filter.component';
import {
  MatFormFieldModule,
  MatButtonToggleModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListOrGridWithFilterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    FormsModule
  ],
  exports: [],
  providers: []
})
export class ListOrGridWithFilterModule {}
