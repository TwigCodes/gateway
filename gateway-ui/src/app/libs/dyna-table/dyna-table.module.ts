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

import { TextCellComponent } from './table-cell/cell-types/text-cell.component';
import { DateCellComponent } from './table-cell/cell-types/date-cell.component';

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
