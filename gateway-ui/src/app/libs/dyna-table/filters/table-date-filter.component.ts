import { Component, OnInit, Inject } from '@angular/core';
import { DateFilter } from '../table-filter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColumnFilter } from '../column-filter.model';

@Component({
  selector: 'ngx-table-date-filter',
  template: `
    <form (ngSubmit)="apply()">
      <h2 mat-dialog-title>Filter for {{ displayName }}</h2>

      <mat-dialog-content>
        <mat-form-field>
          <input
            matInput
            [matDatepicker]="fromDate"
            name="fromDate"
            placeholder="From date"
            [(ngModel)]="model.fromDate"
          />
          <mat-datepicker-toggle
            matSuffix
            [for]="fromDate"
          ></mat-datepicker-toggle>
          <mat-datepicker #fromDate></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <input
            matInput
            [matDatepicker]="toDate"
            name="toDate"
            placeholder="To date"
            [(ngModel)]="model.toDate"
          />
          <mat-datepicker-toggle
            matSuffix
            [for]="toDate"
          ></mat-datepicker-toggle>
          <mat-datepicker #toDate></mat-datepicker>
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
export class TableDateFilterComponent implements OnInit {
  model: DateFilter;

  displayName: string;

  public constructor(
    private readonly dialogRef: MatDialogRef<TableDateFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter
  ) {}

  ngOnInit() {
    this.displayName = this.filterData.column.displayName;
    this.model =
      this.filterData.filter || new DateFilter(this.filterData.column.name);
  }

  apply() {
    if (this.model.fromDate || this.model.toDate) {
      this.dialogRef.close(this.model);
    } else {
      this.dialogRef.close('');
    }
  }
}
