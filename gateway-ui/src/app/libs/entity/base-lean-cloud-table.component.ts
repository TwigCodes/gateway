import { OnInit, OnDestroy } from '@angular/core';
import { map, switchMap, filter, withLatestFrom } from 'rxjs/operators';
import { PageEvent, Sort, MatDialog } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { Entity } from './entity.model';
import { BaseLeanCloudService } from './base-lean-cloud.service';
import { ConfirmService } from '@app/shared';
import { EntityFormComponent } from './entity-form.component';
import { ColumnConfig } from '../dyna-table';
import { untilDestroy } from '../utils';

export abstract class BaseLeanCloudTableComponent<
  T extends Entity,
  TService extends BaseLeanCloudService<T>
> implements OnInit, OnDestroy {
  protected data$ = new BehaviorSubject<T[]>([]);
  protected abstract columns: ColumnConfig[];
  protected abstract entityForm: ComponentType<EntityFormComponent<T>>;
  protected selectable = false;
  protected sortable = false;
  pageChange$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 20,
    length: 0
  });
  sortChange$ = new BehaviorSubject<Sort>({
    active: 'id',
    direction: 'desc'
  });
  delete$ = new Subject<string>();
  update$ = new Subject<T>();
  add$ = new Subject<T>();
  pageIndex$ = this.pageChange$.pipe(map(ev => ev.pageIndex));
  pageSize$ = this.pageChange$.pipe(map(ev => ev.pageSize));
  total$ = new BehaviorSubject<number>(0);
  constructor(
    protected service: TService,
    protected dialog: MatDialog,
    protected confirm: ConfirmService
  ) {
    const combined$ = combineLatest(
      this.pageChange$,
      this.sortChange$,
      (page, sort) => {
        return {
          pageIndex: page.pageIndex,
          pageSize: page.pageSize,
          sort: sort.direction === 'desc' ? `-${sort.active}` : sort.active
        };
      }
    )
      .pipe(
        switchMap(ev => this.service.paged(ev.pageIndex, ev.pageSize, ev.sort)),
        untilDestroy(this)
      )
      .subscribe(data => {
        this.data$.next(data.results);
        this.total$.next(data.count);
      });

    this.delete$
      .pipe(
        switchMap((val: string) =>
          this.service.delete(val).pipe(
            withLatestFrom(this.data$),
            map(([__, data]) => data.filter(item => item.objectId !== val))
          )
        ),
        untilDestroy(this)
      )
      .subscribe(data => {
        this.data$.next(data);
      });

    this.add$
      .pipe(
        switchMap((val: T) =>
          this.service.add(val).pipe(
            withLatestFrom(this.data$),
            map(([result, data]) => [...data, result])
          )
        ),
        untilDestroy(this)
      )
      .subscribe(data => {
        this.data$.next(data);
      });

    this.update$
      .pipe(
        switchMap((val: T) =>
          this.service.update(val.objectId, val).pipe(
            withLatestFrom(this.data$),
            map(([result, data]) => {
              return data.map(item => {
                if (item.objectId === result.objectId) {
                  return Object.assign(item, result);
                }
                return item;
              });
            })
          )
        ),
        untilDestroy(this)
      )
      .subscribe(data => {
        this.data$.next(data);
      });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  handlePageChange(ev: PageEvent) {
    this.pageChange$.next(ev);
  }

  handleSortChange(ev: Sort) {
    this.sortChange$.next(ev);
  }

  handleDelete(row: T) {
    this.confirm
      .delete()
      .pipe(filter(val => val))
      .subscribe(__ => this.delete$.next(row.objectId));
  }

  public abstract handleItem(row: T): void;

  public handleEdit(row: T) {
    const dialogRef = this.dialog.open(this.entityForm, {
      data: { title: 'edit', payload: row }
    });
    dialogRef
      .afterClosed()
      .pipe(filter(val => val))
      .subscribe(val => this.update$.next({ ...val, objectId: row.objectId }));
  }

  public handleAdd() {
    const dialogRef = this.dialog.open(this.entityForm, {
      data: { title: 'add', payload: null }
    });
    dialogRef
      .afterClosed()
      .pipe(filter(val => val))
      .subscribe(val => this.add$.next(val));
  }
}
