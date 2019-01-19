import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  /**
   * @param title The dialog title
   * @param message The message displayed in the body of the dialog
   * @param okLabel The label text on the Ok button
   * @param cancelLabel The label text on the cancelLabel button
   * @returns if dialog close together with clicking on 'Ok' or 'Cancel
   */
  public show(
    title: string,
    message: string,
    okLabel: string = 'Ok',
    cancelLabel: string = 'Cancel'
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      disableClose: true,
      data: { title, message, okLabel, cancelLabel }
    });
    return <Observable<boolean>>dialogRef.afterClosed();
  }
}
