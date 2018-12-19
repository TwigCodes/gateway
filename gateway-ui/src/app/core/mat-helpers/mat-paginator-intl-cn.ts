import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  ofLabel: string;
  unsubscribe: Subject<void> = new Subject<void>();
  constructor(private translate: TranslateService) {
    super();
    this.itemsPerPageLabel = translate.instant(
      'material.paginator.itemsperpage'
    );
    this.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.getAndInitTranslations();
      });

    this.nextPageLabel = translate.instant('material.paginator.next');
    this.previousPageLabel = translate.instant('material.paginator.prev');
    this.firstPageLabel = translate.instant('material.paginator.first');
    this.lastPageLabel = translate.instant('material.paginator.last');
    this.ofLabel = translate.instant('material.paginator.of');
    this.changes.next();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translate
      .get([
        'material.paginator.itemsperpage',
        'material.paginator.next',
        'material.paginator.prev',
        'material.paginator.first',
        'material.paginator.last',
        'material.paginator.of'
      ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(translation => {
        this.itemsPerPageLabel = translation['material.paginator.itemsperpage'];
        this.nextPageLabel = translation['material.paginator.next'];
        this.previousPageLabel = translation['material.paginator.prev'];
        this.firstPageLabel = translation['material.paginator.first'];
        this.lastPageLabel = translation['material.paginator.last'];
        this.ofLabel = translation['material.paginator.of'];
        this.changes.next();
      });
  }

  getRangeLabel = function(page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return `${length} ${this.ofLabel}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${length} ${this.ofLabel} ${startIndex + 1} - ${endIndex}`;
  };
}
