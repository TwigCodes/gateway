import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuditVM } from '@app/feedback';
import { PageEvent } from '@angular/material';
import { ColumnConfig } from '@app/libs';

@Component({
  selector: 'tgapp-audit-container',
  templateUrl: './audit-container.component.html',
  styleUrls: ['./audit-container.component.scss']
})
export class AuditContainerComponent implements OnInit {
  data$: Observable<AuditVM[]> = of([
    {
      id: 1,
      reviewInvitation: {
        id: 1,
        reviewee: {
          id: 1,
          name: 'Zhang San',
          email: 'zhangsan@local.dev'
        },
        reviewers: [
          {
            id: 3,
            name: 'Wang Wu',
            email: 'wangwu@local.dev'
          },
          {
            id: 4,
            name: 'Zhao Liu',
            email: 'zhaoliu@local.dev'
          }
        ]
      }
    }
  ]);
  column: ColumnConfig = {
    name: 'id',
    header: 'ID,',
    cell: (e: AuditVM) => `${e.id}`,
    type: 'text'
  };
  row: {
    id: 1;
    reviewInvitation: {
      id: 1;
      reviewee: {
        id: 1;
        name: 'Zhang San';
        email: 'zhangsan@local.dev';
      };
      reviewers: [
        {
          id: 3;
          name: 'Wang Wu';
          email: 'wangwu@local.dev';
        },
        {
          id: 4;
          name: 'Zhao Liu';
          email: 'zhaoliu@local.dev';
        }
      ];
    };
  };
  columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: AuditVM) => `${e.id}`,
      type: 'string'
    },
    {
      name: 'reviewee.name',
      header: '员工姓名',
      cell: (e: AuditVM) => e.reviewInvitation.reviewee.name,
      type: 'string'
    },
    {
      name: 'reviewee.email',
      header: '员工 Email',
      cell: (e: AuditVM) => `${e.reviewInvitation.reviewee.email}`,
      type: 'string'
    },
    {
      name: 'reviewers',
      header: '评价者',
      cell: (e: AuditVM) => `${e.reviewInvitation.reviewers}`,
      type: 'string'
    },
    {
      name: 'auditBy',
      header: '审核人',
      cell: (e: AuditVM) => (e.auditedBy ? '已审核' : '未审核'),
      type: 'string'
    },
    {
      name: 'auditAt',
      header: '审核时间',
      cell: (e: AuditVM) => e.auditedAt,
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

  handleItem(row: AuditVM) {
    console.log(row);
  }
}
