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
  MatToolbarModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListOrGridWithFilterComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    FormsModule
  ],
  exports: [ListOrGridWithFilterComponent]
})
export class ListOrGridWithFilterModule {}
