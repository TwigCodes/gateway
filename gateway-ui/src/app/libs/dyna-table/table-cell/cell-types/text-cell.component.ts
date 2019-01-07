import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';

@Component({
  selector: 'ngx-text-cell',
  template: '{{ displayText }}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextCellComponent implements CellComponent {
  @Input() column: ColumnConfig;
  @Input() row: object;

  get displayText() {
    return this.column.cell != null && typeof this.column.cell === 'function'
      ? this.column.cell(this.row)
      : this.displayText;
  }
}
