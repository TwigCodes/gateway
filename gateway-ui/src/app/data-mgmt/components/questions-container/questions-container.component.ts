import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ColumnConfig, BaseLeanCloudTableComponent, Crumb } from '@app/libs';
import { ConfirmService } from '@app/shared';
import { Question } from '../../data-mgmt.model';
import { QuestionService } from '../../services';
import { QuestionDialogComponent } from './question-dialog.component';

@Component({
  selector: 'tgapp-questions-container',
  templateUrl: '../../../libs/entity/templates/entity-table.html',
  styles: [
    `
      :host {
        position: absolute;
        height: calc(100% - 64px - 44px - 20px);
        overflow-y: auto;
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsContainerComponent
  extends BaseLeanCloudTableComponent<Question, QuestionService>
  implements OnInit {
  public columns: ColumnConfig[];
  public crumbs: Crumb[];
  public entityForm = QuestionDialogComponent;
  constructor(
    protected service: QuestionService,
    protected dialog: MatDialog,
    protected confirm: ConfirmService
  ) {
    super(service, dialog, confirm);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sortable = true;
    this.selectable = false;
    this.crumbs = [
      { name: 'tgapp.breadcrumb.admin.home', link: '../../' },
      { name: 'tgapp.breadcrumb.admin.data-mgmt.questions', link: '.' }
    ];
    this.columns = [
      {
        name: 'id',
        header: 'ID',
        cell: (e: Partial<Question>) => {
          const item = new Question(e);
          return item.id;
        },
        type: 'string',
        sortable: true
      },
      {
        name: 'title',
        header: '问题内容',
        cell: (e: Question) => e.title,
        type: 'string',
        filterable: true
      },
      {
        name: 'type',
        header: '问题类型',
        cell: (e: Question) => `${e.type}`,
        type: 'string'
      },
      {
        name: 'options',
        header: '问题选项',
        cell: (e: Question) =>
          `${e.options ? e.options.map(o => o.label).join(',') : ''}`,
        type: 'string'
      },
      {
        name: 'createdAt',
        header: '创建时间',
        cell: (e: Question) => e.createdAt,
        type: 'date',
        sortable: true,
        filterable: true
      },
      {
        name: 'updatedAt',
        header: '更新时间',
        cell: (e: Question) => e.updatedAt,
        type: 'date',
        sortable: true,
        filterable: true
      }
    ];
  }

  handleItem(row: Question) {
    console.log(row);
  }
}
