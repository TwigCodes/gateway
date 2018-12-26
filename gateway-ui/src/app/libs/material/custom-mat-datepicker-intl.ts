import { MatDatepickerIntl } from '@angular/material';
import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class CustomMatDatepickerIntl extends MatDatepickerIntl
  implements OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();
  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getAndInitTranslations();
      });
    this.calendarLabel = translate.instant('material.datepicker.calendar');
    this.nextMonthLabel = translate.instant('material.datepicker.nextmonth');
    this.nextMultiYearLabel = translate.instant(
      'material.datepicker.nextmultiyear'
    );
    this.nextYearLabel = translate.instant('material.datepicker.nextyear');
    this.openCalendarLabel = translate.instant(
      'material.datepicker.opencalendar'
    );
    this.prevMonthLabel = translate.instant('material.datepicker.prevmonth');
    this.prevMultiYearLabel = translate.instant(
      'material.datepicker.prevmultiyear'
    );
    this.prevYearLabel = translate.instant('material.datepicker.prevyear');
    this.switchToMonthViewLabel = translate.instant(
      'material.datepicker.switchtomonthview'
    );
    this.switchToMultiYearViewLabel = translate.instant(
      'material.datepicker.switchtomultiyearview'
    );
    this.changes.next();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translate
      .get([
        'material.datepicker.calendar',
        'material.datepicker.nextmonth',
        'material.datepicker.nextmultiyear',
        'material.datepicker.nextyear',
        'material.datepicker.opencalendar',
        'material.datepicker.prevmonth',
        'material.datepicker.prevmultiyear',
        'material.datepicker.prevyear',
        'material.datepicker.switchtomonthview',
        'material.datepicker.switchtomultiyearview'
      ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(translation => {
        this.calendarLabel = translation['material.datepicker.calendar'];
        this.nextMonthLabel = translation['material.datepicker.nextmonth'];
        this.nextMultiYearLabel =
          translation['material.datepicker.nextmultiyear'];
        this.nextYearLabel = translation['material.datepicker.nextyear'];
        this.openCalendarLabel =
          translation['material.datepicker.opencalendar'];
        this.prevMonthLabel = translation['material.datepicker.prevmonth'];
        this.prevMultiYearLabel =
          translation['material.datepicker.prevmultiyear'];
        this.prevYearLabel = translation['material.datepicker.prevyear'];
        this.switchToMonthViewLabel =
          translation['material.datepicker.switchtomonthview'];
        this.switchToMultiYearViewLabel =
          translation['material.datepicker.switchtomultiyearview'];
        this.changes.next();
      });
  }
}
