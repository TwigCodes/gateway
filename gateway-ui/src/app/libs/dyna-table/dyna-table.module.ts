import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';

import { DynaTableComponent } from './dyna-table.component';
import { TableCellComponent } from './table-cell/table-cell.component';

import {
  CellService,
  CellDirective,
  DetailRowDirective,
  ColumnFilterService
} from './table-cell';

import { TextCellComponent, DateCellComponent } from './table-cell/cell-types';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [
    CellDirective,
    DetailRowDirective,
    DynaTableComponent,
    TableCellComponent,
    TextCellComponent,
    DateCellComponent
  ],
  exports: [DynaTableComponent, DetailRowDirective],
  entryComponents: [TextCellComponent, DateCellComponent],
  providers: [CellService, ColumnFilterService]
})
export class DynaTableModule {
  constructor(readonly cellService: CellService) {
    cellService.registerCell('string', TextCellComponent);
    cellService.registerCell('date', DateCellComponent);
  }
}
