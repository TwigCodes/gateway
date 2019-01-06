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
  MatButtonModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule
} from '@angular/material';

import { DynaTableComponent } from './dyna-table.component';
import { TableCellComponent } from './table-cell/table-cell.component';

import {
  CellService,
  CellDirective,
  DetailRowDirective,
  ColumnFilterService
} from './table-cell';
import { TableTextFilterComponent, TableDateFilterComponent } from './filters';
import { TextCellComponent, DateCellComponent } from './table-cell/cell-types';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    FlexLayoutModule
  ],
  declarations: [
    CellDirective,
    DetailRowDirective,
    DynaTableComponent,
    TableCellComponent,
    TextCellComponent,
    DateCellComponent,
    TableTextFilterComponent,
    TableDateFilterComponent
  ],
  exports: [DynaTableComponent, DetailRowDirective],
  entryComponents: [
    TextCellComponent,
    DateCellComponent,
    TableTextFilterComponent,
    TableDateFilterComponent
  ],
  providers: [CellService, ColumnFilterService]
})
export class DynaTableModule {
  constructor(
    readonly cellService: CellService,
    readonly filterService: ColumnFilterService
  ) {
    cellService.registerCell('string', TextCellComponent);
    cellService.registerCell('date', DateCellComponent);
    filterService.registerFilter('string', TableTextFilterComponent);
    filterService.registerFilter('date', TableDateFilterComponent);
  }
}
