import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';

@Component({
  selector: 'ngx-date-cell',
  template: '{{ column.cell(row) | date:dateFormat }}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateCellComponent implements CellComponent, OnInit {
  @Input() column: ColumnConfig;
  @Input() row: object;

  dateFormat = 'short';

  ngOnInit() {
    if (this.column.options) {
      if (this.column.options.dateFormat) {
        this.dateFormat = this.column.options.dateFormat;
      }
    }
  }
}
