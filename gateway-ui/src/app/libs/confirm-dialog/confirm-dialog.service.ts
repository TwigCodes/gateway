import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

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
