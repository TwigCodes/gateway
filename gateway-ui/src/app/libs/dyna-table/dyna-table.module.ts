import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
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
import {
  TextCellComponent,
  DateCellComponent,
  TranslateCellComponent
} from './table-cell/cell-types';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    TranslateModule
  ],
  declarations: [
    CellDirective,
    DetailRowDirective,
    DynaTableComponent,
    TableCellComponent,
    TextCellComponent,
    DateCellComponent,
    TranslateCellComponent,
    TableTextFilterComponent,
    TableDateFilterComponent
  ],
  exports: [DynaTableComponent, DetailRowDirective],
  entryComponents: [
    TextCellComponent,
    DateCellComponent,
    TranslateCellComponent,
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
    cellService.registerCell('translate', TranslateCellComponent);
    filterService.registerFilter('string', TableTextFilterComponent);
    filterService.registerFilter('date', TableDateFilterComponent);
  }
}
