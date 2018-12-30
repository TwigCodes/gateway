import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  MatTreeModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { SimpleTreeComponent } from './simple-tree.component';

@NgModule({
  declarations: [SimpleTreeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [SimpleTreeComponent]
})
export class SimpleTreeModule {}
