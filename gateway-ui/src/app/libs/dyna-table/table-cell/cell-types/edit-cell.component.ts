import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CellComponent } from './cell.component';
import { ColumnConfig } from '../../column-config.model';

@Component({
  selector: 'ngx-edit-cell',
  template: `
    <button
      type="button"
      (click)="handleEdit()"
      color="primary"
      mat-icon-button
    >
      <mat-icon>edit_mode</mat-icon>
    </button>

    <button type="button" (click)="handleDelete()" color="warn" mat-icon-button>
      <mat-icon>delete</mat-icon>
    </button>
  `
})
export class EditCellComponent implements CellComponent {
  @Input() column: ColumnConfig;
  @Input() row: object;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  public handleEdit() {
    this.edit.emit(this.row);
  }

  /**
   * handleDelete
   */
  public handleDelete() {
    this.delete.emit(this.row);
  }
}
