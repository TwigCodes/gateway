import { OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map, switchMap, filter, withLatestFrom } from 'rxjs/operators';
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
  pageChange$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    length: 0
  });
  sortChange$ = new BehaviorSubject<string | null>(null);
  filterChange$ = new BehaviorSubject<string | null>(null);
  delete$ = new Subject<string>();
  update$ = new Subject<T>();
  add$ = new Subject<T>();
  pageIndex$ = this.pageChange$.pipe(map(ev => ev.pageIndex));
  pageSize$ = this.pageChange$.pipe(map(ev => ev.pageSize));
  total$ = new BehaviorSubject<number>(0);
  loading$: Observable<boolean>;
  @ViewChild('table') table: DynaTableComponent;
  constructor(
    protected service: TService,
    protected dialog: MatDialog,
    protected confirm: ConfirmService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.service.loading$;
    combineLatest(this.pageChange$, this.sortChange$, this.filterChange$)
      .pipe(
        map(([page, sort, filterStr]) => {
          return {
            pageIndex: page.pageIndex,
            pageSize: page.pageSize,
            sort: sort,
            filter: filterStr
          };
        }),
        switchMap(ev =>
          this.service.paged(ev.pageIndex, ev.pageSize, ev.sort, ev.filter)
        ),
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
      this.sortChange$.next(null);
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
      .subscribe(val => this.update$.next({ ...val, objectId: row.objectId }));
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
