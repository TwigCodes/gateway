import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from '@app/libs/confirm-dialog/confirm-dialog.service';

@Injectable()
export class ConfirmService {
  constructor(
    private confirm: ConfirmDialogService,
    private translate: TranslateService
  ) {}
  /**
   * show
   */
  public delete() {
    return this.confirm.show(
      this.translate.instant('tgapp.confirm.delete.title'),
      this.translate.instant('tgapp.confirm.delete.message'),
      this.translate.instant('tgapp.confirm.delete.ok'),
      this.translate.instant('tgapp.confirm.delete.cancel')
    );
  }
}
