import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule
} from '@angular/material';

import { DynaTableComponent } from './dyna-table.component';
import { TableCellComponent } from './table-cell/table-cell.component';

import {
  CellService,
  CellDirective,
  DetailRowDirective,
  ColumnFilterService
} from './table-cell';

import {
  TextCellComponent,
  DateCellComponent,
  EditCellComponent
} from './table-cell/cell-types';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
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
    DateCellComponent,
    EditCellComponent
  ],
  exports: [DynaTableComponent, DetailRowDirective],
  entryComponents: [TextCellComponent, DateCellComponent, EditCellComponent],
  providers: [CellService, ColumnFilterService]
})
export class DynaTableModule {
  constructor(readonly cellService: CellService) {
    cellService.registerCell('string', TextCellComponent);
    cellService.registerCell('date', DateCellComponent);
    cellService.registerCell('edit', EditCellComponent);
  }
}
