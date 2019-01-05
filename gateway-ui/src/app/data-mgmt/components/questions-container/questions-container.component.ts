import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { PageEvent } from '@angular/material';
import { ColumnConfig } from '@app/libs';
import { Question } from '@app/data-mgmt/data-mgmt.model';
import { QuestionService } from '@app/data-mgmt/services/question.service';
import { BaseLeanCloudTableComponent } from '@app/libs';

@Component({
  selector: 'tgapp-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsContainerComponent
  extends BaseLeanCloudTableComponent<Question, QuestionService>
  implements OnInit {
  protected columns: ColumnConfig[];
  @ViewChild('myTpl') myTpl: TemplateRef<any>;
  constructor(protected service: QuestionService) {
    super(service);
  }

  ngOnInit() {
    this.columns = [
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
      },
      {
        name: 'edit',
        displayName: '',
        cell: null,
        type: 'action',
        templateRef: this.myTpl
      }
    ];
  }

  pageChange(ev: PageEvent) {
    this.pageChange$.next(ev);
  }

  handleItem(row: Question) {
    console.log(row);
  }

  handleEdit(row: Question) {
    console.log(row);
  }

  handleDelete(row: Question) {
    console.log(row);
  }
}
