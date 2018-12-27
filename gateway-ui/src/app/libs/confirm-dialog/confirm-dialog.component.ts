import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'ngx-confirm',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  okLabel = 'OK';
  cancelLabel = 'Cancel';
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      okLabel: string;
      cancelLabel: string;
      title: string;
      message: string;
    }
  ) {
    this.okLabel = data.okLabel;
    this.cancelLabel = data.cancelLabel;
  }
}
