import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';

@Component({
  selector: 'ngx-text-cell',
  template: `
    <span
      *ngIf="displayText.length > 30; else noTruncate"
      matTooltip="{{ displayText }}"
      >{{ displayText | slice: 0:30 }}...
    </span>
    <ng-template #noTruncate> {{ displayText }} </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextCellComponent implements CellComponent {
  @Input() column: ColumnConfig;
  @Input() row: object;

  get displayText() {
    return this.column.cell(this.row);
  }
}
