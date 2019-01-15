import { OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { PageEvent, Sort, MatDialog } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { BehaviorSubject, combineLatest, Subject, Observable } from 'rxjs';
import { Entity } from './entity.model';
import { BaseLeanCloudService } from './base-lean-cloud.service';
import { ConfirmService } from '@app/shared';
import { EntityFormComponent } from './entity-form.component';
import {
  ColumnConfig,
  ColumnFilter,
  DEFAULT_PAGE_SIZE,
  DynaTableComponent
} from '../dyna-table';
import { untilDestroy } from '../utils';
import { Crumb } from '../bread-crumbs';
import * as _ from 'lodash';
import { tag } from 'rxjs-spy/operators';

export abstract class BaseLeanCloudTableComponent<
  T extends Entity,
  TService extends BaseLeanCloudService<T>
> implements OnInit, OnDestroy {
  public data$ = new BehaviorSubject<T[]>([]);
  public abstract columns: ColumnConfig[];
  public abstract crumbs: Crumb[];
  protected abstract entityForm: ComponentType<EntityFormComponent<T>>;
  public selectable = false;
  public sortable = false;
  public multiSortable = false;
  public stickyHeader = true;
  DEFAULT_SORT = '-updatedAt';
  pageChange$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    length: 0
  });
  sortChange$ = new BehaviorSubject<string>(this.DEFAULT_SORT);
  filterChange$ = new BehaviorSubject<string | null>(null);
  delete$ = new Subject<string>();
  update$ = new Subject<T>();
  add$ = new Subject<T>();
  loadMore$ = new Subject<void>();
  pageIndex$ = this.pageChange$.pipe(map(ev => ev.pageIndex));
  pageSize$ = this.pageChange$.pipe(map(ev => ev.pageSize));
  total$ = new BehaviorSubject<number>(0);
  loading$: Observable<boolean>;
  render$: Observable<T[]>;
  @ViewChild('table') table: DynaTableComponent;
  constructor(
    protected service: TService,
    protected dialog: MatDialog,
    protected confirm: ConfirmService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.service.loading$;
    this.render$ = this.data$.asObservable().pipe(
      map(data => {
        return data.length === 0
          ? []
          : data.length <= this.pageChange$.value.pageSize
          ? data
          : data.slice(
              this.pageChange$.value.pageIndex *
                this.pageChange$.value.pageSize,
              this.pageChange$.value.pageSize
            );
      }),
      tag('render')
    );
    const load$ = combineLatest(
      this.pageChange$,
      this.sortChange$,
      this.filterChange$
    ).pipe(
      switchMap(_ =>
        this.service.paged(
          this.pageChange$.value.pageIndex * this.pageChange$.value.pageSize,
          this.pageChange$.value.pageSize,
          this.sortChange$.value,
          this.filterChange$.value
        )
      )
    );
    load$.pipe(untilDestroy(this)).subscribe(data => {
      this.data$.next(data.results);
      this.total$.next(data.count);
    });

    this.delete$
      .pipe(
        switchMap((val: string) =>
          this.service.delete(val).pipe(
            tap(__ => {
              const filteredData = this.data$.value.filter(
                it => it.objectId !== val
              );
              this.data$.next(filteredData);
              this.total$.next(this.total$.value - 1);
              if (
                (this.pageChange$.value.pageIndex + 1) *
                  this.pageChange$.value.pageSize <
                this.total$.value
              ) {
                this.loadMore$.next();
              }
            })
          )
        ),
        untilDestroy(this)
      )
      .subscribe();

    this.loadMore$
      .pipe(
        switchMap(_ =>
          this.service.paged(
            this.pageChange$.value.pageIndex * this.pageChange$.value.pageSize,
            this.pageChange$.value.pageSize,
            this.sortChange$.value,
            this.filterChange$.value
          )
        ),
        tap(res => {
          const ds = _.uniq([...this.data$.value, ...res.results]);
          this.data$.next(ds);
          this.total$.next(res.count);
        }),
        untilDestroy(this)
      )
      .subscribe();

    this.add$
      .pipe(
        switchMap((val: T) =>
          this.service.add(val).pipe(
            map(item => [item, ...this.data$.value]),
            tap(data => this.data$.next(data))
          )
        ),
        untilDestroy(this)
      )
      .subscribe(data => {
        this.data$.next(data);
        this.total$.next(this.total$.value + 1);
      });

    this.update$
      .pipe(
        switchMap((val: T) =>
          this.service.update(val.objectId, val).pipe(
            map(result => {
              const data = this.data$.value;
              const idx = data.findIndex(d => d.objectId === result.objectId);
              const old = data[idx];
              const updated = Object.assign(old, val, result);

              return [
                ...data.slice(0, idx),
                _.clone(updated),
                ...data.slice(idx + 1)
              ];
            })
          )
        ),
        untilDestroy(this)
      )
      .subscribe(data => {
        this.data$.next(data);
      });
  }
  ngOnDestroy(): void {}

  handlePageChange(ev: PageEvent) {
    this.pageChange$.next(ev);
  }

  handleSortChange(ev: { [key: string]: Sort }) {
    const sortArr = [];
    for (const key in ev) {
      if (ev.hasOwnProperty(key)) {
        const sort = ev[key];
        switch (sort.direction) {
          case 'asc':
            sortArr.push(sort.active);
            break;
          case 'desc':
            sortArr.push(`-${sort.active}`);
            break;
          default:
            break;
        }
      }
    }
    if (sortArr.length === 0) {
      this.sortChange$.next(this.DEFAULT_SORT);
      return;
    }
    this.sortChange$.next(sortArr.join(','));
  }

  handleDelete(row: T) {
    this.confirm
      .delete()
      .pipe(filter(val => val))
      .subscribe(__ => this.delete$.next(row.objectId));
  }

  handleFilter(appliedFilters: { [key: string]: ColumnFilter }) {
    const filters = [];
    for (const key in appliedFilters) {
      if (appliedFilters.hasOwnProperty(key)) {
        const appliedFilterValue = appliedFilters[key] as any;
        const activeFilter = appliedFilterValue.getFilter();
        for (const filterKey in activeFilter) {
          if (activeFilter.hasOwnProperty(filterKey)) {
            const filterValue = activeFilter[filterKey];
            for (const propKey in filterValue) {
              if (filterValue.hasOwnProperty(propKey)) {
                const propValue = filterValue[propKey];
                filters.push({ [filterKey]: { [propKey]: propValue } });
              }
            }
          }
        }
      }
    }
    if (filters.length === 0) {
      this.filterChange$.next(null);
      return;
    }
    const filterQuery = JSON.stringify(
      filters.length === 1 ? filters[0] : { $and: filters }
    );
    this.filterChange$.next(filterQuery);
  }

  public abstract handleItem(row: T): void;

  public handleEdit(row: T) {
    const dialogRef = this.dialog.open(this.entityForm, {
      data: { title: 'ngx-table-edit-dialog.title', payload: row }
    });
    dialogRef
      .afterClosed()
      .pipe(filter(val => val))
      .subscribe(val =>
        this.update$.next({
          ...val,
          objectId: row.objectId
        })
      );
  }

  public handleAdd() {
    const dialogRef = this.dialog.open(this.entityForm, {
      data: { title: 'ngx-table-add-dialog.title', payload: <T>{} }
    });
    dialogRef
      .afterClosed()
      .pipe(filter(val => val))
      .subscribe(val => this.add$.next(val));
  }

  public resetFiltersAndSorts() {
    this.table.resetFiltersAndSorts();
  }

  public clearFilters() {
    this.table.clearFilters();
  }

  public clearSorts() {
    this.table.clearSorts();
  }
}
