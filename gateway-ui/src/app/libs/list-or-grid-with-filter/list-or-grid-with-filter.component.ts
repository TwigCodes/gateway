import {
  Component,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TranslateService } from '@ngx-translate/core';

export interface Item {
  title: string;
  subtitle: string;
  desc: string;
  value: any;
}

@Component({
  selector: 'ngx-list-or-grid-with-filter',
  templateUrl: './list-or-grid-with-filter.component.html',
  styleUrls: ['./list-or-grid-with-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOrGridWithFilterComponent {
  @Input() items: Item[] = [];
  @Input() filterPlaceholder = '';
  @Input() showAdd = false;
  @Input() userServerFilter = false;
  @Output() select = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() filter = new EventEmitter();
  filterValue: string | null;
  selection = new SelectionModel<Partial<Item>>(false, []);
  @ViewChild('gridView')
  public gridView: MatButtonToggleGroup;
  constructor(private translate: TranslateService) {}

  handleSelected(item: Item) {
    this.select.emit(item.value);
  }

  handleAdd() {
    this.add.emit();
  }

  handleFilter() {
    this.filter.emit(this.filterValue);
  }

  public get filteredItems(): Item[] {
    return this.userServerFilter
      ? this.items
      : this.filterValue
      ? this.items.filter(
          item =>
            this.translate
              .instant(item.title)
              .toLowerCase()
              .includes(this.filterValue.toLowerCase()) ||
            this.translate
              .instant(item.subtitle.toLowerCase())
              .includes(this.filterValue.toLowerCase())
        )
      : this.items;
  }
}
