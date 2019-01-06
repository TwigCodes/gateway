import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  PageEvent,
  Sort,
  MatCheckboxChange,
  MatTableDataSource
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ColumnConfig } from './column-config.model';
import { ColumnFilter } from './column-filter.model';
import { Identifiable } from './identifiable.model';
import { ColumnFilterService } from './table-cell/column-filter.service';

@Component({
  selector: 'ngx-dyna-table',
  templateUrl: './dyna-table.component.html',
  styleUrls: ['./dyna-table.component.scss']
})
export class DynaTableComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<Identifiable[]>;
  @Input() columns: ColumnConfig[];
  @Input() total = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 20;
  @Input() pageSizeOptions = [20, 50, 100];
  @Input() showPaginator = true;
  @Input() stickyHeader = false;
  @Input() selectable = false;
  @Input() sortable = true;
  @Input() expandTpl: TemplateRef<any>;

  @Output() selectChange = new EventEmitter<any[]>();
  @Output() rowClick = new EventEmitter();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() actionEdit = new EventEmitter();
  @Output() actionDelete = new EventEmitter();
  @Output() actionAdd = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Identifiable> = new MatTableDataSource();
  displayedColumns: string[];
  selection = new SelectionModel<Identifiable>(true, []);
  isHighlight = false;
  selectedIndex = -1;
  subscription = new Subscription();

  private appliedFilters: { [key: string]: ColumnFilter } = {};

  constructor(
    private readonly columnFilterService: ColumnFilterService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.data$ == null) {
      throw Error('DynaTable must be provided with data stream.');
    }
    if (this.columns == null) {
      throw Error('DynaTable must be provided with column definitions.');
    }

    this.subscription.add(
      this.data$.subscribe(data => {
        this.dataSource.data = [];
        this.dataSource.data = data;
      })
    );
    this.displayedColumns = this.selectable
      ? [...['select'], ...this.columns.map(c => c.name)]
      : this.columns.map(c => c.name);

    const dataSource = this.dataSource;
    if (this.sortable) {
      dataSource.sort = this.sort;
    }
    if (this.showPaginator) {
      dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    this.subscription = Subscription.EMPTY;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectChange.emit(this.selection.selected);
  }

  canFilter(column: ColumnConfig) {
    const filter = this.columnFilterService.getFilter(column.type);

    return filter != null;
  }

  isFiltered(column: ColumnConfig) {
    return this.appliedFilters[column.name];
  }

  filter(column: ColumnConfig) {
    const filter = this.columnFilterService.getFilter(column.type);

    if (filter) {
      const dialogConfig = new MatDialogConfig();
      const columnFilter = new ColumnFilter();
      columnFilter.column = column;

      if (this.appliedFilters[column.name]) {
        columnFilter.filter = Object.create(this.appliedFilters[column.name]);
      }

      dialogConfig.data = columnFilter;

      const dialogRef = this.dialog.open(filter, dialogConfig);

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(result => {
          if (result) {
            this.appliedFilters[column.name] = result;
          } else if (result === '') {
            delete this.appliedFilters[column.name];
          }

          if (result || result === '') {
            console.log(result);
          }
        });
    }
  }

  clearFilters() {
    this.appliedFilters = {};
  }
  getFilters() {
    const filters = this.appliedFilters;
    const filterArray = Object.keys(filters).map(key => filters[key]);
    return filterArray;
  }

  emitPage(ev: PageEvent) {
    this.selection.clear();
    this.pageChange.emit(ev);
  }

  toggleHighlight(enable: boolean, index: number) {
    this.isHighlight = enable;
    this.selectedIndex = index;
  }

  handleRowClick(row: any, ev: Event) {
    ev.stopPropagation();
    this.rowClick.emit(row);
  }

  handleSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  handleSelectChange(ev: MatCheckboxChange, row: any) {
    if (!ev) {
      return;
    }
    this.selection.toggle(row);
    this.selectChange.emit(this.selection.selected);
  }

  handleRowActionEdit(row: any, ev: Event) {
    ev.stopPropagation();
    this.actionEdit.emit(row);
  }

  handleRowActionDelete(row: any, ev: Event) {
    ev.stopPropagation();
    this.actionDelete.emit(row);
  }

  handleRowActionAdd(ev: Event) {
    ev.stopPropagation();
    this.actionAdd.emit();
  }
}
