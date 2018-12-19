import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QueryPart, QueryPartBuilder, Operator } from '../filter.util';
import { FilterField } from '../filter.util';

@Component({
  selector: 'ngx-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterMenuComponent implements OnInit {
  @Input() filterField: FilterField;
  @Input() operators: Operator[] = [];
  @Input() queryParts: QueryPart[] = [];
  @Input() openFilter: boolean;
  @Output() filterAdd = new EventEmitter<QueryPart>();
  @Output() filterRemove = new EventEmitter<QueryPart>();
  @Output() filterClear = new EventEmitter<QueryPart[]>();
  @ViewChild('filterMenu') public filterMenu;
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      operator: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  trackQuery(index, queryPart: QueryPart) {
    return queryPart ? queryPart.toString() : undefined;
  }

  remove(queryPart: QueryPart) {
    this.queryParts = this.queryParts.filter(
      part => part.toString() !== queryPart.toString()
    );
    this.filterRemove.emit(queryPart);
  }

  submit() {
    const value = this.form.value;
    const valid = this.form.valid;
    if (!valid) {
      return;
    }
    const queryPart = new QueryPartBuilder()
      .Field(this.filterField)
      .Op(value.operator)
      .FilterValue({ value: value.value })
      .build();
    if (
      this.queryParts.filter(part => part.toString() === queryPart.toString())
        .length > 0
    ) {
      return;
    }
    this.queryParts = [...this.queryParts, queryPart];
    this.filterAdd.emit(queryPart);
    this.form.reset();
  }

  clear() {
    this.filterClear.emit(this.queryParts);
    this.queryParts = [];
    this.form.reset();
  }
}
