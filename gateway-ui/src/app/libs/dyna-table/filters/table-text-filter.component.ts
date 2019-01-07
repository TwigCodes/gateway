import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColumnFilter } from '../column-filter.model';
import { TextFilter } from '../table-filter';

@Component({
  selector: 'ngx-table-text-filter',
  template: `
    <form (ngSubmit)="apply()">
      <h2 mat-dialog-title>Filter for {{ displayName }}</h2>

      <mat-dialog-content>
        <mat-form-field>
          <input
            type="text"
            matInput
            placeholder="Containing"
            name="value"
            [(ngModel)]="model.value"
          />
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button mat-dialog-close>Clear</button>
        <button mat-button type="submit">Apply</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [``]
})
export class TableTextFilterComponent implements OnInit {
  model: TextFilter;

  displayName: string;

  public constructor(
    private readonly dialogRef: MatDialogRef<TableTextFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter
  ) {}

  ngOnInit() {
    this.displayName = this.filterData.column.header;
    this.model =
      this.filterData.filter || new TextFilter(this.filterData.column.name);
  }

  apply() {
    if (this.model.value) {
      this.dialogRef.close(this.model);
    } else {
      this.dialogRef.close('');
    }
  }
}
