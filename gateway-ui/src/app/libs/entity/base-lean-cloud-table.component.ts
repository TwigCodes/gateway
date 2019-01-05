import { OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Entity } from './entity.model';
import { BaseLeanCloudService } from './base-lean-cloud.service';
import { ColumnConfig } from '@app/libs';
import { PageEvent } from '@angular/material';
import { map, switchMap } from 'rxjs/operators';

export abstract class BaseLeanCloudTableComponent<
  T extends Entity,
  TService extends BaseLeanCloudService<T>
> implements OnInit {
  protected data$: Observable<T[]>;
  protected abstract columns: ColumnConfig[];
  pageChange$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 20,
    length: 0
  });
  pageIndex$ = this.pageChange$.pipe(map(ev => ev.pageIndex));
  pageSize$ = this.pageChange$.pipe(map(ev => ev.pageSize));
  total$: Observable<number>;
  constructor(protected service: TService) {
    this.data$ = this.pageChange$.pipe(
      switchMap(ev =>
        this.service
          .paged(ev.pageIndex, ev.pageSize)
          .pipe(map(result => result.results))
      )
    );
    this.total$ = this.pageChange$.pipe(
      switchMap(ev =>
        this.service
          .paged(ev.pageIndex, ev.pageSize)
          .pipe(map(result => result.count))
      )
    );
  }

  ngOnInit(): void {}

  pageChange(ev: PageEvent) {
    this.pageChange$.next(ev);
  }

  public abstract handleItem(row: T): void;

  public abstract handleEdit(row: T): void;

  public abstract handleDelete(row: T): void;
}
