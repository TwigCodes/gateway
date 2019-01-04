import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, of } from 'rxjs';
import { ColumnConfig } from '@app/libs';
import { Question } from '@app/data-mgmt/data-mgmt.model';

@Component({
  selector: 'tgapp-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsContainerComponent implements OnInit {
  data$: Observable<Question[]>;
  columns: ColumnConfig[] = [
    {
      name: 'id',
      displayName: 'ID',
      cell: (e: Question) => `${e.objectId}`,
      type: 'string'
    },
    {
      name: 'title',
      displayName: '问题内容',
      cell: (e: Question) => e.title,
      type: 'string'
    },
    {
      name: 'type',
      displayName: '问题类型',
      cell: (e: Question) => `${e.type}`,
      type: 'string'
    },
    {
      name: 'createdAt',
      displayName: '创建时间',
      cell: (e: Question) => e.createdAt,
      type: 'date'
    },
    {
      name: 'updatedAt',
      displayName: '更新时间',
      cell: (e: Question) => e.updatedAt,
      type: 'date'
    }
  ];
  page$: Observable<number> = of(0);
  size$: Observable<number> = of(1);
  sort$: Observable<string> = of('id');
  total$: Observable<number> = of(1);
  constructor() {}

  ngOnInit() {}

  pageChange(ev: PageEvent) {
    const pageable = {
      page: ev.pageIndex * ev.pageSize,
      size: ev.pageSize
    };
    console.log(pageable);
  }

  handleItem(row: Question) {
    console.log(row);
  }
}
