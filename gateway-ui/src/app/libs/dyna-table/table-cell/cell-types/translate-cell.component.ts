import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';

@Component({
  selector: 'ngx-translate-cell',
  template: `
    <span [matTooltip]="displayText">{{ displayText | translate }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslateCellComponent implements CellComponent {
  @Input() column: ColumnConfig;
  @Input() row: object;

  get displayText() {
    return this.column.cell(this.row);
  }
}
