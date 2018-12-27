import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { NotificationService } from './notification.service';

/** Report ngrx-data success/error actions as toast messages **/
@Injectable()
export class NgrxNotificationService {
  constructor(actions$: Actions, notification: NotificationService) {
    actions$
      .pipe(
        filter(
          (action: Action) =>
            action.type.includes('Add') ||
            action.type.includes('Delete') ||
            action.type.includes('Update')
        )
      )
      // this service never dies so no need to unsubscribe
      .subscribe(action => {
        if (action.type.endsWith('Success')) {
          notification.success('操作成功！');
        }
        if (action.type.endsWith('Fail')) {
          notification.error('操作失败，尴尬了');
        }
      });
  }
}
