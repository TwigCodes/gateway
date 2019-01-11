import { Component, OnInit, Inject } from '@angular/core';
import { DateFilter } from '../table-filter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ColumnFilter } from '../column-filter.model';
import { endOfDay } from 'date-fns';

@Component({
  selector: 'ngx-table-date-filter',
  template: `
    <form (ngSubmit)="apply()">
      <h2 mat-dialog-title>
        {{ 'ngx-table-date-filter.dialog.title' | translate }} {{ displayName }}
      </h2>

      <mat-dialog-content>
        <mat-form-field>
          <input
            matInput
            [max]="model.toDate || maxDate"
            [matDatepicker]="fromDate"
            name="fromDate"
            placeholder="{{
              'ngx-table-date-filter.dialog.from-date' | translate
            }}"
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
            [min]="model.fromDate"
            [max]="maxDate"
            [matDatepicker]="toDate"
            name="toDate"
            placeholder="{{
              'ngx-table-date-filter.dialog.to-date' | translate
            }}"
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
        <button mat-button mat-dialog-close>
          {{ 'ngx-table-date-filter.dialog.clear' | translate }}
        </button>
        <button mat-button type="submit">
          {{ 'ngx-table-date-filter.dialog.apply' | translate }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [``]
})
export class TableDateFilterComponent implements OnInit {
  model: DateFilter;

  displayName: string;

  maxDate = endOfDay(Date.now());
  public constructor(
    private readonly dialogRef: MatDialogRef<TableDateFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter
  ) {}

  ngOnInit() {
    this.displayName = this.filterData.column.header;
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
